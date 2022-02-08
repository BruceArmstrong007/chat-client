import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginAction } from 'src/app/auth/store/actions/login.action';
import {
  isSubmitingSelector,
  validationErrorSelector,
} from 'src/app/auth/store/selectors/auth.selector';
import { LoginCredentialsInterface } from 'src/app/auth/types/loginCredentials.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loginForm: FormGroup = this.fb.group({
    username: '',
    password: '',
  });
  isSubmitting$: Observable<boolean | null> | undefined;
  backendError$: Observable<string | null> | undefined;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmitingSelector));
    this.backendError$ = this.store.pipe(select(validationErrorSelector));
  }
  onSubmit() {
    const request: LoginCredentialsInterface = this.loginForm.value;
    this.store.dispatch(loginAction({ request }));
  }

  clear() {
    this.loginForm.reset();
  }
}
