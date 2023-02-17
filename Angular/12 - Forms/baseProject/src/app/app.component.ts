import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm!: NgForm;
  defaultQuestion = 'pet';

  anwser: string = '';


  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // onSubmit(data: NgForm) {
  //   console.log(data);
  // }

  onSubmit(data: NgForm) {
    console.log(this.signupForm);
  }
}
