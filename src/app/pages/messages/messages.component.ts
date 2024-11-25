import { AfterViewChecked, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  _socketService = inject(SocketService)
  messages: any[] = [];
  rooms: any[] = [];
  message: string = '';
  private socket!: Socket
  currentUser: any = localStorage.getItem('user')
  user = JSON.parse(this.currentUser).user
  receiverId: string = '671f260804f1e0d03308b13f'
  currentRoom: any
  currentReceiver: any

  // @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messagesContainer', { static: false }) messagesContainer!: ElementRef;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this._socketService.onMessage().subscribe((message: any) => {
      let currentRoom = this.rooms.find(room => message.roomId === room._id)
      currentRoom.chat[0] = message.newMessage
      this.messages.push(message.newMessage);
    });
    this.getAllRooms();
  }
  // new APIs

  scrollToBottom(): void {
    try {
      const container: any = this.messagesContainer?.nativeElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      } else {
        console.warn('Messages container not found.');
      }
    } catch (err) {
      console.error('Scroll error', err);
    }
  }

  selectRoom(room: any): void {
    this.getRoom(room._id)
  }

  getAllRooms(): void {
    this._socketService.getAllRooms(this.user._id).subscribe({
      next: (response) => {
        console.log(response, 'get all room response');
        if (response.status == 200) {
          this.rooms = response.data
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getRoom(roomId: string): void {
    this._socketService.getRoomById(roomId).subscribe({
      next: (response) => {
        console.log(response, 'current room response');
        if (response.success) {
          this.currentRoom = response.data
          if (this.user._id === this.currentRoom.createdWith._id) {
            this.currentReceiver = this.currentRoom.createdBy
          } else {
            this.currentReceiver = this.currentRoom.createdWith
          }
          this.messages = response.data.chat
        }
      },
      error: (error) => {
        console.error(error);
      }
    });

  }

  sendNewMessage(roomId?: string): void {
    const payload = {
      senderId: this.user._id,
      receiverId: this.user._id === this.currentRoom.createdWith._id ? this.currentRoom.createdBy._id : this.currentRoom.createdWith._id,
      message: this.message
    }
    this._socketService.sendNewMessage(this.currentRoom._id, payload).subscribe({
      next: (response) => {
        this.message = '';
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  createRoom(): void {
    const payload = {
      createdBy: this.user._id,
      createdWith: this.receiverId
    }
    this._socketService.createRoom(payload).subscribe({
      next: (response) => {
        console.log(response, 'create room response');
        // if (response.status == 200) {
        //   this.rooms = response.data
        // }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
