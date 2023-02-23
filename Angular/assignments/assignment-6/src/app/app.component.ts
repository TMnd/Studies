import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('signupForm') signupForm!: NgForm;

  subscriptions = ['Basic', 'Advanced', 'Pro']
  defaultSubscription = 'Advanced';
  submitted = false;
  user = {
    email: '',
    subscription: '',
    password: ''
  }

  onSubmit(data: NgForm) {
    this.submitted = true;
    this.user.email = this.signupForm.value.userData.email;
    this.user.subscription = this.signupForm.value.userData.subscription;
    this.user.password = this.signupForm.value.userData.password;

    this.signupForm.reset();
  }

}
