import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  evenNumberList: number[] = [];
  oddNumberList: number[] = [];
  intervalRef: any;
  globalVar: number = 0;

  constructor() {}

  startApp(){
    console.log("start pressed");
    this.intervalRef = setInterval(() => {
        this.globalVar = this.globalVar+1 
        if(this.globalVar % 2 == 0) {
          this.evenNumberList.push(this.globalVar);
        } else {
          this.oddNumberList.push(this.globalVar);
        }
      }
      , 1000);
  }

  stopApp(){
    console.log("stop pressed");
    clearInterval(this.intervalRef);
    this.evenNumberList.splice(0, this.evenNumberList.length);
    this.oddNumberList.splice(0, this.oddNumberList.length);
  }
}
