import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { listAction } from 'src/app/user/store/actions/list.action';
import { listSelector } from 'src/app/user/store/selectors/list.selector';
import { AddInterface } from 'src/app/user/types/add.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
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
    this.userData$ = this.store.pipe(select(listSelector));
  }

  remove(friend: string) {
    if (this.token != null && this.user != null) {
      let request: AddInterface = {
        username: this.user,
        friend: friend,
        token: this.token,
      };
      this.store.dispatch(listAction({ request }));
    }
  }
}
