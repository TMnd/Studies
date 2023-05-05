import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap, BehaviorSubject } from "rxjs";
import { throwError } from "rxjs";
import { User } from "./user.model";
import * as fromApp from '../store/app.reducer';
import { Store } from "@ngrx/store";
import * as AuthAction from './store/auth.actions'

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}


@Injectable({providedIn: 'root'})
export class AuthService {
    //user = new BehaviorSubject<User>(null); //Permite aceder ao objecto sem necessitar dar .next()
    private tokenExpirationTimeout: any;

    constructor(
        private http: HttpClient,
        private router :Router,
        private store: Store<fromApp.AppState>
    ) {}


    onSignUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDC4z-GxUhd4im1CGBCyQrdNeurl_xiS-Y',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorResp => this.handleError(errorResp)), tap(resData => {
           this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    login(email:string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDC4z-GxUhd4im1CGBCyQrdNeurl_xiS-Y',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorResp => this.handleError(errorResp)), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    autoLogin() {
        const userData:{
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        }
        
        const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token, 
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token) {
            //this.user.next(loadedUser);
            this.store.dispatch(new AuthAction.Login({
                email: loadedUser.email, 
                userId: loadedUser.id, 
                token: loadedUser.token,
                expirationDate: new Date(userData._tokenExpirationDate)
            }))
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); 
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        //this.user.next(null);
        this.store.dispatch(new AuthAction.Logout());
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimeout) {
            clearTimeout(this.tokenExpirationTimeout);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimeout = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        //this.user.next(user);
        this.store.dispatch(
            new AuthAction.Login({
                email: email,
                userId: userId,
                token: token,
                expirationDate: expirationDate
            })
        );
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An Unknown error occurred';
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(() => new Error(errorMessage));
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
        return throwError(() => new Error(errorMessage));
    }
    
}