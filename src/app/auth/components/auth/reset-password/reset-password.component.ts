import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { resetAction } from 'src/app/auth/store/actions/reset.action';
import {
  isSubmitingSelector,
  validationErrorSelector,
} from 'src/app/auth/store/selectors/auth.selector';
import { ResetCredentialsInterface } from 'src/app/auth/types/resetCredentials.interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  hide: boolean = true;
  resetForm: FormGroup = this.fb.group({
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

  initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmitingSelector));
    this.backendError$ = this.store.pipe(select(validationErrorSelector));
  }
  onSubmit() {
    const request: ResetCredentialsInterface = this.resetForm.value;
    this.store.dispatch(resetAction({ request }));
  }

  clear() {
    this.resetForm.reset();
  }
}
