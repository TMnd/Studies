import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent {
  @Output() startFunction = new EventEmitter<null>;
  @Output() stopFunction = new EventEmitter<null>;
  
  onStartFunction() {
    this.startFunction.emit();
  }
  
  onStopFunction() {
    this.stopFunction.emit();
  }
  
}
