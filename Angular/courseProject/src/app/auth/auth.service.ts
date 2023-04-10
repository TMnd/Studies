import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, catchError, tap, BehaviorSubject } from "rxjs";
import { throwError } from "rxjs";
import { User } from "./user.model";

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
    user = new BehaviorSubject<User>(null); //Permite aceder ao objecto sem necessitar dar .next()


    constructor(
        private http: HttpClient
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

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
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