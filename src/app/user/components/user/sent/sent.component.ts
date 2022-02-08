import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { undoSentAction } from 'src/app/user/store/actions/sent.action';
import { undoSentSelector } from 'src/app/user/store/selectors/sent.selector';
import { AddInterface } from 'src/app/user/types/add.interface';
@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css'],
})
export class SentComponent implements OnInit {
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
    this.userData$ = this.store.pipe(select(undoSentSelector));
  }

  undo(friend: string) {
    if (this.token != null && this.user != null) {
      let request: AddInterface = {
        username: this.user,
        friend: friend,
        token: this.token,
      };
      this.store.dispatch(undoSentAction({ request }));
    }
  }
}
