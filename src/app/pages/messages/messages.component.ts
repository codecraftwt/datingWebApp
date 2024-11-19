import { Component, inject, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Socket } from 'socket.io-client';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit {
  _socketService = inject(SocketService)
  messages: any[] = [];
  rooms: any[] = [];
  message: string = '';
  private socket!: Socket

  ngOnInit(): void {
    this._socketService.onMessage().subscribe((message: any) => {
      console.log('message===>', message)
      this.messages.push(message);
    });
    this.getMessages();
    this.getRooms()
  }

  getMessages() {
    this._socketService.getMessages('room123').subscribe((response: any) => {
      console.log(response)
      this.messages = response
      this.message = '';
    });
  }

  getRooms() {
    this._socketService.getRooms().subscribe((response: any) => {
      console.log(response)
      this.rooms = response
    });
  }

  sendMessage(): void {
    const payload = {
      message: this.message,
      roomId: 'room123',
      userId: 'user1',
    }
    this._socketService.sendMessage(payload).subscribe((response: any) => {
      console.log(response)
      this.message = '';
    });
  }

}
