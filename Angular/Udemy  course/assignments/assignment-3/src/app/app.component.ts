import { Component } from '@angular/core';

type Log = {
  timestamp: Date;
  numberOfPress: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showPassword = false;
  toggleLogList: Log[] = [];
  numberOfPress = 0;

  showPass() {
    this.numberOfPress++;
    this.logToggle();
    this.showPassword = !this.showPassword;
  }

  logToggle() {
    const buttonPress={
      timestamp: new Date(),
      numberOfPress: this.numberOfPress
    }
    this.toggleLogList.push(buttonPress);
  }

  getColor(numberOfPress: number) {
    return (numberOfPress>5) ? "blue" : "";
  }

}
