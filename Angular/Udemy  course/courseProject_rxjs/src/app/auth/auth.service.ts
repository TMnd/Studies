import { Injectable } from "@angular/core";
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
    private tokenExpirationTimeout: any;

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTimeout = setTimeout(() => {
            this.store.dispatch(new AuthAction.Logout());
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if (this.tokenExpirationTimeout) {
            clearTimeout(this.tokenExpirationTimeout);
            this.tokenExpirationTimeout = null;
        }
    }
    
}