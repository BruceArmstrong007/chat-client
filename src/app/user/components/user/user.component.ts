import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, tap, filter } from 'rxjs';
import {
  isLoggedinAction,
  isLoggedoutAction,
} from '../../store/actions/user.action';
import { UserInterface } from '../../types/user.interface';
import {
  isLogggedInuserSelector,
  usernameSelector,
  userSelector,
} from '../../store/selectors/user.selector';
import { UserDataInterface } from '../../types/userData.interface';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  panelOpenState: boolean = false;
  user$: Observable<UserDataInterface | null> | undefined;
  username$: Observable<boolean | null> | undefined;
  hidden: boolean = false;
  constructor(private store: Store, private route: ActivatedRoute) {
    let user = this.route.snapshot.params['user'];
  }
  ngOnInit(): void {
    this.initializeValues();
    if (this.route.children[0].snapshot.url[0].path === 'request-received') {
      this.hidden = true;
    }
  }
  initializeValues(): void {
    this.user$ = this.store.select(userSelector);
    this.username$ = this.store.pipe(select(isLogggedInuserSelector));
  }

  logout() {
    let request: UserInterface = {
      isLoggedIn: false,
      verification: false,
      user: {
        id: null,
        username: null,
        name: null,
        details: {
          friends: [],
          requestsSent: [],
          requestsRecieved: [],
          find: [],
        },
      },
    };
    this.store.dispatch(isLoggedoutAction({ request }));
  }
}
