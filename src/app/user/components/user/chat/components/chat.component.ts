import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { ChatService } from 'src/app/user/components/user/chat/services/chat.service';
import { listSelector } from 'src/app/user/store/selectors/list.selector';
import { ChatRequestInterface } from 'src/app/user/components/user/chat/types/chatRequest.interface';
import {
  leaveAction,
  messageAction,
  fetchChatAction,
  pushAction,
  joinAction,
} from '../store/actions/chat.action';
import { ChatFetchInterface } from './../types/chatFetch.interface';
import { friendsSelector } from './../store/selectors/chat.selector';
import { ChatInterface } from '../types/chat.interface';
import { JoinInterface } from '../types/join.interface';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  username: string = '';
  room: string = '';
  text: string = '';
  chatObserver: any;
  token: string | null = null;
  userSelected: string | undefined;
  userData$: Observable<string[]> | undefined;
  messageArray: any[] = [];
  message$: Observable<any> | undefined;
  constructor(
    private store: Store,
    private persistanceService: PersistanceService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.chatObserver = this.chatService
      .getMessage()
      .subscribe((data: ChatRequestInterface) => {
        this.store.dispatch(pushAction({ data }));
      });
    this.initializeValues();
  }
  ngOnDestroy() {
    this.chatObserver.unsubscribe();
  }

  initializeValues() {
    let temp = this.persistanceService.get('user');
    if (temp != null) {
      this.username = temp;
    }
    this.userData$ = this.store.pipe(select(listSelector));
    this.token = this.persistanceService.get('token');
  }

  changeUser(event: any): void {
    this.text = '';
    this.messageArray = [];
    if (this.room != '') {
      let request: JoinInterface = {
        user: this.username,
        room: this.room,
      };
      this.store.dispatch(leaveAction({ request }));
    }
    let join: JoinInterface = {
      user: this.username,
      room: this.room,
    };
    this.store.dispatch(joinAction({ join }));
    this.room = [event[0], this.username].sort().toString();
    if (this.username != '' && this.token != null) {
      let request: ChatFetchInterface = {
        room: this.room,
        token: this.token,
      };
      this.store.dispatch(fetchChatAction({ request }));

      this.message$ = this.store.pipe(select(friendsSelector));
    }
  }

  sendMessage(): void {
    if (this.username != '' && this.room != '' && this.text != '') {
      let request: ChatRequestInterface = {
        id: Date.now(),
        user: this.username,
        room: this.room,
        message: this.text,
      };
      this.store.dispatch(messageAction({ request }));
    }
    this.text = '';
  }
}
