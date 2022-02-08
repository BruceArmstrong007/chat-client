import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegisterCredentialsInterface } from 'src/app/auth/types/registerCredentials.interface';
import { registerAction } from 'src/app/auth/store/actions/register.action';
import {
  isSubmitingSelector,
  validationErrorSelector,
} from 'src/app/auth/store/selectors/auth.selector';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;
  registerForm: FormGroup = this.fb.group({
    name: '',
    username: '',
    password: '',
    rpassword: '',
  });
  isSubmitting$: Observable<boolean | null> | undefined;
  backendError$: Observable<string | null> | undefined;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmitingSelector));
    this.backendError$ = this.store.pipe(select(validationErrorSelector));
  }

  onSubmit(): void {
    const request: RegisterCredentialsInterface = this.registerForm.value;
    this.store.dispatch(registerAction({ request }));
  }

  clear() {
    this.registerForm.reset();
  }
}
