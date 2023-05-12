import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AuthActions from './auth.actions';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable()
export class AuthEffects {

    authLogin = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDC4z-GxUhd4im1CGBCyQrdNeurl_xiS-Y',
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            )
            .pipe(
                map(resData => {
                    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                        return new AuthActions.Login({
                            email: resData.email,
                            userId: resData.localId,
                            token: resData.idToken,
                            expirationDate: expirationDate
                        }
                    );
                }),
                catchError(errorRes => {
                    let errorMessage = 'An Unknown error occurred';
                    if(!errorRes.error || !errorRes.error.error) {
                        return of(new AuthActions.LoginFail(errorMessage));
                    }
                    switch(errorRes.error.error.message) {
                        case 'EMAIL_EXISTS':
                            errorMessage = 'This email exists already';
                            break;
                        case 'EMAIL_NOT_FOUND':
                        case 'INVALID_PASSWORD':
                            errorMessage = 'Invalid email/password'
                            break;
                    }
                    return of(
                        new AuthActions.LoginFail(errorMessage)
                    );
                }), 
            );
        }),
    ));

    authSuccess = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['/']);
        })
    ),{ dispatch: false });

    constructor(
        private actions$: Actions, //$ significa que é um observable
        private http: HttpClient,
        private router: Router
    ) {}


}