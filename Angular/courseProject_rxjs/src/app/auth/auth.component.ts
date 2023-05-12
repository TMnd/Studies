import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
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
export class AuthComponent implements OnInit {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective; //Find the 1st occurence of this directive
    private closeAlertSub : Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private viewContainerRef: ViewContainerRef,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit(): void {
        this.store.select('auth').subscribe(authState => {
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

        let authObs: Observable<AuthResponseData>;

        if(this.isLoginMode) {
            // authObs = this.authService.login(email, password);
            this.store.dispatch(new AuthActions.LoginStart({
                email: email,
                password: password
            }));
        } else {
            authObs = this.authService.onSignUp(email, password);
        }

        this.store.select('auth').subscribe(authState => {

        });

        /*authObs.subscribe({
            next: (v) => {
                this.isLoading=false;
                this.router.navigate(['/recipes']); 
                console.log(v);
            },
            error: (errorMessage) => {
                this.isLoading=false;
                console.log(errorMessage);
                this.showErrorAlert(errorMessage);
                this.error = errorMessage;
            },
            complete() {
                console.info('complete');
            },
        }); */

        form.reset();
        
    }

    onHandlerError() {
        this.error = null;
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