import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private _httpService = inject(HttpService);

  constructor() {
    this.socket = io('https://backend-dating.onrender.com/');
    this.socketInitialization()
  }

  socketInitialization() {
    this.socket.on('message', (data) => { this.getMessages(data.roomId) })
    this.socket.on('message', (data) => { this.getRoomById(data.roomId) })
    this.socket.on('createroom', (data) => { this.getAllRooms() })
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
  public getAllRooms() {
    return this._httpService.get<any>(`api/chat/rooms`)
  }

  public getRoomById(roomId: string) {
    return this._httpService.get<any>(`api/chat/rooms/${roomId}`)
  }

  public sendNewMessage(roomId: string, data: any) {
    return this._httpService.post<any>(`api/chat/${roomId}/messages`, data)
  }

  public createRoom(data: any) {
    return this._httpService.post<any>(`api/chat/create-room`, data)
  }

}
