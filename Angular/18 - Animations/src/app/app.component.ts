import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300)),
      // transition('highlighted => normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('highlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', animate(500)),
    ])
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];
  

  onAnimate() { 
    this.state === 'normal' ? this.state ='highlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState ='highlighted' : this.wildState = 'normal';
  }

  onShrink(){
    console.log("---");
    this.wildState = 'shrunken' 
  }

  onAdd(item) {
    this.list.push(item);
  }
}
