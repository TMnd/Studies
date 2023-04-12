import { Component, ComponentFactoryResolver, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective, {static: false}) alertHost: PlaceHolderDirective; //Find the 1st occurence of this directive

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

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
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.onSignUp(email, password);
        }

        authObs.subscribe({
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
        });

        form.reset();
        
    }

    onHandlerError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        
        hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);
    }
}