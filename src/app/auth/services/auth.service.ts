import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthInterface } from '../types/auth.interface';
import { ResponseInterface } from 'src/app/shared/types/response.interface';
import { LoginCredentialsInterface } from '../types/loginCredentials.interface';
import { RegisterCredentialsInterface } from '../types/registerCredentials.interface';
import { ResetCredentialsInterface } from '../types/resetCredentials.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: RegisterCredentialsInterface): Observable<ResponseInterface> {
    let url = environment.apiUrl + 'auth/register';
    return this.http
      .post<ResponseInterface>(url, data)
      .pipe(map((response: ResponseInterface) => response));
  }

  login(data: LoginCredentialsInterface): Observable<ResponseInterface> {
    let url = environment.apiUrl + 'auth/login';
    return this.http
      .post<ResponseInterface>(url, data)
      .pipe(map((response: ResponseInterface) => response));
  }

  reset(data: ResetCredentialsInterface): Observable<ResponseInterface> {
    let url = environment.apiUrl + 'auth/reset-password';
    return this.http
      .post<ResponseInterface>(url, data)
      .pipe(map((response: ResponseInterface) => response));
  }

  logout(data: AuthInterface): Observable<ResponseInterface> {
    let url = environment.apiUrl + 'auth/logout';
    return this.http
      .post<ResponseInterface>(url, data)
      .pipe(map((response: ResponseInterface) => response));
  }
}
