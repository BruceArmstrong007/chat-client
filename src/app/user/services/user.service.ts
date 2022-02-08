import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddInterface } from '../types/add.interface';
import { FetchInterface } from '../types/fetch.interface';
import { ResponseInterface } from './../../shared/types/response.interface';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  fetch(data: FetchInterface): Observable<ResponseInterface> {
    let url = environment.apiUrl + 'user/fetch';
    return this.http.post<ResponseInterface>(url, data, {}).pipe(
      map((response: ResponseInterface) => {
        return response;
      })
    );
  }

  find(data: FetchInterface): Observable<ResponseInterface> {
    let url = environment.apiUrl + 'user/find';
    return this.http.post<ResponseInterface>(url, data, {}).pipe(
      map((response: ResponseInterface) => {
        return response;
      })
    );
  }

  add(data: AddInterface): Observable<ResponseInterface> {
    let url = environment.apiUrl + 'user/add';
    return this.http.post<ResponseInterface>(url, data, {}).pipe(
      map((response: ResponseInterface) => {
        return response;
      })
    );
  }
  undo(data: AddInterface): Observable<ResponseInterface> {
    let url = environment.apiUrl + 'user/undo';
    return this.http.post<ResponseInterface>(url, data, {}).pipe(
      map((response: ResponseInterface) => {
        return response;
      })
    );
  }

  accept(data: AddInterface): Observable<ResponseInterface> {
    let url = environment.apiUrl + 'user/accept';
    return this.http.post<ResponseInterface>(url, data, {}).pipe(
      map((response: ResponseInterface) => {
        return response;
      })
    );
  }

  remove(data: AddInterface): Observable<ResponseInterface> {
    let url = environment.apiUrl + 'user/remove';
    return this.http.post<ResponseInterface>(url, data, {}).pipe(
      map((response: ResponseInterface) => {
        return response;
      })
    );
  }
}
