import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/IUser';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { HttpEndPointService } from './http-end-point.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  Auth_api = 'https://dummyjson.com/auth/login';
  router = inject(Router);
  private isloggedInSubject$ = new BehaviorSubject<boolean>(false);
  authToken: string = 'token';

  constructor(private http: HttpEndPointService) {
    const localToken = localStorage.getItem(this.authToken);
    if (localToken) {
      this.isloggedInSubject$.next(true);
    }
  }

  login(username: string, password: string): Observable<IUser> {
    return this.http.post<IUser>(this.Auth_api, { username, password }).pipe(
      // we use tap operator to get the response and set the token in the local storage and tap is used to perform side effects
      // side effect is any action that is performed in the application that does not affect the main flow of the application
      tap((res: IUser) => {
        // first step when the user is logged in seccessfully we catch the token
        const acces_token = res.accessToken;
        console.log(res.accessToken);
        // then we set the token in the local storage to keep it in the browser
        // so that we can use it in the future to keep the user logged in
        localStorage.setItem(this.authToken, acces_token);
        // then we set token in the http service to keep it in the header of the request
        this.http.setToken(acces_token);
        console.log('Setting isLoggedIn to true'); // Debugging log
        this.isloggedInSubject$.next(true);
      })
    );
  }

  isLoggedInValue(): Observable<boolean> {
    return this.isloggedInSubject$.asObservable();
  }

  getValue() {
    return this.isloggedInSubject$.value;
  }
}
