import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpEndPointService {
  http = inject(HttpClient);
  token!: string;
  constructor() {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  post<T>(url: string, payload: any): Observable<T> {
    return this.http.post<T>(url, payload);
  }

  setToken(acc_token: string) {
    this.token = acc_token;
  }

  protected getheaders(): HttpHeaders {
    let headers = new HttpHeaders();

    headers = headers.set('Authorization', 'Barer' + this.token);
    headers = headers.set('Access-Control-Allow-Origin', '*');
    headers = headers.set('Accept', 'application/json');

    return headers;
  }
}
