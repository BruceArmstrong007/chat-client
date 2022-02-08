import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import {
  addAction,
  findAction,
  findFailureAction,
} from 'src/app/user/store/actions/find.action';
import { findSelector } from 'src/app/user/store/selectors/find.selector';
import { FetchInterface } from 'src/app/user/types/fetch.interface';
import { AddInterface } from 'src/app/user/types/add.interface';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css'],
})
export class FindComponent implements OnInit {
  token: string | null;
  user:string| null;
  userData$: Observable<any[]> | undefined;
  constructor(
    private store: Store,
    private persistanceService: PersistanceService,
  ) {
    this.token = this.persistanceService.get('token');
    this.user = this.persistanceService.get('user')
  }
  username: string = '';

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.userData$ = this.store.pipe(select(findSelector));
  }

  find() {
    if (this.token != null) {
      let request: FetchInterface = {
        username: this.username,
        token: this.token,
      };
      this.store.dispatch(findAction({ request }));
      return;
    }
  }

  add(username: string) {
    if (this.token != null && this.user != null) {
      let request: AddInterface = {
        username: this.user,
        friend: username,
        token: this.token,
      };
      this.store.dispatch(addAction({ request }));
    }
  }

  clear() {
    let response = {
      success: false,
      message: 'Cleared Find Results',
      payload: [],
    };
    this.store.dispatch(findFailureAction({ response }));
    this.username = '';
  }
}
