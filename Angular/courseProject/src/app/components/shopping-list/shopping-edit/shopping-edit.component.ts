import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', {static: true}) nameInput: ElementRef | undefined;
  @ViewChild('amountInput', {static: true}) amountInput: ElementRef | undefined;

  @Output() addToShoppingList = new EventEmitter<Ingredient>

  onAddShoppingElement(name: HTMLInputElement, amount: HTMLInputElement) {
    this.addToShoppingList.emit(new Ingredient(name.value, amount.valueAsNumber))
  }
}
