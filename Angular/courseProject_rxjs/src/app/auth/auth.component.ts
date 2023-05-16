import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { Store } from "@ngrx/store";

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective; //Find the 1st occurence of this directive
    private closeAlertSub : Subscription;

    private storeSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private viewContainerRef: ViewContainerRef,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnDestroy(): void {
        if(this.closeAlertSub) {
            this.closeAlertSub.unsubscribe();
        }

        if(this.storeSub) {
            this.storeSub.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return;
        }

        this.isLoading = true;

        const email = form.value.email;
        const password = form.value.password;

        if(this.isLoginMode) {
            // authObs = this.authService.login(email, password);
            this.store.dispatch(new AuthActions.LoginStart({
                email: email,
                password: password
            }));
        } else {
            this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
        }

        form.reset();
        
    }

    onHandlerError() {
        this.store.dispatch(new AuthActions.ClearError());
    }

    private showErrorAlert(message: string) {
        const componentRef = this.viewContainerRef.createComponent<AlertComponent>(AlertComponent);


        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        
        
        componentRef.instance.message=message;

        this.closeAlertSub = componentRef.instance.close.subscribe(() => {
            this.closeAlertSub.unsubscribe();
            componentRef.destroy();
            hostViewContainerRef.clear();
        });
    }
}