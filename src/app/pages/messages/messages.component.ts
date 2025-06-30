import { AfterViewChecked, Component, ElementRef, HostListener, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Socket } from 'socket.io-client';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('subscriptionModal') subscriptionModalRef!: TemplateRef<any>;
  _socketService = inject(SocketService)
  private _modalService = inject(NgbModal);
  messages: any[] = [];
  showEmojiPicker: boolean = false;
  rooms: any[] = [];
  message: string = '';
  private socket!: Socket
  currentUser: any = localStorage.getItem('user')
  user = JSON.parse(this.currentUser).user
  receiverId: string = '671f260804f1e0d03308b13f'
  currentRoom: any
  currentReceiver: any
  selectedRoom: any = null;
  isSubscriptionError: boolean = false;
  selectedFiles: File[] = [];
  @ViewChild('messagesContainer', { static: false }) messagesContainer!: ElementRef;
  @ViewChild('emojiPicker') emojiPickerRef!: ElementRef;

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

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    this.message += event.emoji.native;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (
      this.showEmojiPicker &&
      this.emojiPickerRef &&
      !this.emojiPickerRef.nativeElement.contains(event.target) &&
      !(event.target as HTMLElement).closest('button[mat-icon-button]')
    ) {
      this.showEmojiPicker = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (this.showEmojiPicker) {
      this.showEmojiPicker = false;
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      console.log('Files selected:', this.selectedFiles);

      // Example: Upload or attach files to your message
      this.uploadFiles(this.selectedFiles);
    }
  }

  uploadFiles(files: File[]) {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    console.log('Uploading files...', formData);
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        const container: any = this.messagesContainer?.nativeElement;
        if (container) {
          container.scrollTop = container.scrollHeight;
        } else {
          console.warn('Messages container not found.');
        }
      }, 0);
    } catch (err) {
      console.error('Scroll error', err);
    }
  }

  onSearch(event: any) {
    const searchTerm = event.target.value;

    if (searchTerm === "") {
      this.getAllRooms();
    }
    const filteredRooms = this.rooms.filter(room =>
      room.createdWith.firstName.includes(searchTerm) || room.createdWith.lastName.includes(searchTerm)
    );
    this.rooms = filteredRooms;
  }

  selectRoom(room: any): void {
    this.selectedRoom = room;
    this.getRoom(room._id);
  }

  getAllRooms(): void {
    this._socketService.getAllRooms(this.user._id).subscribe({
      next: (response) => {
        if (response.status == 200) {
          this.rooms = response.data
          if (this.rooms.length > 0) {
            // Auto-select first room if none selected
            if (!this.selectedRoom) {
              this.selectRoom(this.rooms[0]);
            } else {
              const foundRoom = this.rooms.find(r => r._id === this.selectedRoom._id);
              if (foundRoom) this.selectedRoom = foundRoom;
            }
          }
          this.getRoom(this.rooms[0]._id)
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
        this.showEmojiPicker = false;
        const roomIndex = this.rooms.findIndex(r => r._id === this.currentRoom._id);
        if (roomIndex > -1) {
          this.rooms[roomIndex].chat[0] = payload;
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error && error.message == "Free plan daily limit of 5 reached.") {
          this.isSubscriptionError = true;
          this.showEmojiPicker = false;
          this.openSunscriptionModal();
          return;
        }
        console.error(error);
      }
    });
  }

  editMessage(msg: any) {
    console.log(msg, 'edit msg');
    let message = msg.message;
    this.message = message;
  }

  updateMessage(msg: any, senderId: any) {

  }

  deleteMessage(msg: any) {
    console.log(msg, 'delete msg');
    this.isEditable(msg);
  }

  isEditable(msg: any): boolean {
    const messageTime = new Date(msg.timestamp).getTime();
    const currentTime = new Date().getTime();
    const oneHour = 60 * 60 * 1000;
    console.log(currentTime - messageTime < oneHour);

    return currentTime - messageTime < oneHour;
  }

  openSunscriptionModal() {
    this._modalService.open(this.subscriptionModalRef, { centered: true, size: 'md' });
  }

  createRoom(): void {
    const payload = {
      createdBy: this.user._id,
      createdWith: this.receiverId
    }
    this._socketService.createRoom(payload).subscribe({
      next: (response) => {
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
