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
    this.socket = io('http://localhost:5000');
    this.socketInitialization()
  }

  socketInitialization() {
    this.socket.on('message', (data) => { this.getMessages(data.roomId) })
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
}
