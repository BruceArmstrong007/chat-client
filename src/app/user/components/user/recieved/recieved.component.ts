import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { undoReceivedAction } from 'src/app/user/store/actions/recieved.action';
import { acceptAction } from 'src/app/user/store/actions/sent.action';
import { undoReceivedSelector } from 'src/app/user/store/selectors/received.selector';
import { AddInterface } from 'src/app/user/types/add.interface';

@Component({
  selector: 'app-recieved',
  templateUrl: './recieved.component.html',
  styleUrls: ['./recieved.component.css'],
})
export class RecievedComponent implements OnInit {
  token: string | null;
  user: string | null;
  userData$: Observable<any[]> | undefined;
  constructor(
    private store: Store,
    private persistanceService: PersistanceService
  ) {
    this.token = this.persistanceService.get('token');
    this.user = this.persistanceService.get('user');
  }
  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.userData$ = this.store.pipe(select(undoReceivedSelector));
  }

  undo(friend: string) {
    if (this.token != null && this.user != null) {
      let request: AddInterface = {
        username: friend,
        friend: this.user,
        token: this.token,
      };
      this.store.dispatch(undoReceivedAction({ request }));
    }
  }

  accept(friend: string) {
    if (this.token != null && this.user != null) {
      let request: AddInterface = {
        username: this.user,
        friend: friend,
        token: this.token,
      };
      this.store.dispatch(acceptAction({ request }));
    }
  }
}
