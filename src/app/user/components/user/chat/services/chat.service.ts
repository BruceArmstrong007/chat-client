import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddInterface } from '../../../../types/add.interface';
import { FetchInterface } from '../../../../types/fetch.interface';
import { ResponseInterface } from '../../../../../shared/types/response.interface';
import { ChatRequestInterface } from '../types/chatRequest.interface';
import { ChatFetchInterface } from '../types/chatFetch.interface';
import { JoinInterface } from '../types/join.interface';

@Injectable()
export class ChatService {
  private socket: Socket;
  constructor(private http: HttpClient) {
    this.socket = io(environment.apiUrl);
  }

  fetch(data: ChatFetchInterface): Observable<ResponseInterface> {
    let url = environment.apiUrl + 'chat/fetch';
    return this.http.post<ResponseInterface>(url, data, {}).pipe(
      map((response: ResponseInterface) => {
        return response;
      })
    );
  }

  joinRoom(data: JoinInterface): void {
    this.socket.emit('join', data);
    this.socket.connect();
  }

  leaveRoom(data: JoinInterface): void {
    this.socket.emit('leave', data);
    this.socket.disconnect();
  }

  sendMessage(data: ChatRequestInterface): void {
    this.socket.connect();
    this.socket.emit('message', data);
  }

  getMessage(): Observable<ChatRequestInterface> {
    return new Observable<ChatRequestInterface>((observer) => {
      this.socket.on('New Message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
