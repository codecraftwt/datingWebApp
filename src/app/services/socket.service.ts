import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private _httpService = inject(HttpService);
  user: any = localStorage.getItem('user');
  currentUser = JSON.parse(this.user).user;

  constructor() {
    // this.socket = io('http://localhost:5000');
    this.socket = io('https://backend-dating.onrender.com');
    this.socketInitialization()
  }

  socketInitialization() {
    this.socket.on('message', (data) => { this.getMessages(data.roomId) })
    this.socket.on('message', (data) => { this.getRoomById(data.roomId) })
    this.socket.on('createroom', (data) => { this.getAllRooms(this.currentUser._id) })
  }

  public sendMessage(data: any) {
    // this.socket.emit('message', message);
    return this._httpService.post<any>(`api/messages`, data)
  }

  public getMessages(roomId: string) {
    return this._httpService.get<any>(`api/messages/${roomId}`)
  }

  public getRooms() {
    return this._httpService.get<any>(`api/messages/rooms`)
  }

  public onMessage() {
    return new Observable(observer => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  }

  // new APIs
  public getAllRooms(userId: string) {
    return this._httpService.get<any>(`api/chat/rooms/${userId}`)
  }

  public getRoomById(roomId: string) {
    return this._httpService.get<any>(`api/chat/room/${roomId}`)
  }

  public sendNewMessage(roomId: string, data: any) {
    return this._httpService.post<any>(`api/chat/${roomId}/messages`, data)
  }

  public createRoom(data: any) {
    return this._httpService.post<any>(`api/chat/create-room`, data)
  }

}
