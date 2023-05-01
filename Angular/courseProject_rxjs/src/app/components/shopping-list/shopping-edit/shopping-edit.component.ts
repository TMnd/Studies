import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/components/shopping-list/shopping-list.service';
import { NgForm }   from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
	@ViewChild('f',{static: false}) slForm: NgForm;
	subscription: Subscription;
	editMode = false;
	editedItemIndex: number;
	editedItem: Ingredient;

	constructor(
		private shoppingListService: ShoppingListService,
		private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
	){}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	ngOnInit(): void {
		this.subscription = this.shoppingListService.startingEditing.subscribe(
		(index: number) => {
			this.editedItemIndex = index;
			this.editMode = true;
			this.editedItem = this.shoppingListService.getIngredient(index);
			this.slForm.setValue({
			name: this.editedItem.name,
			amount: this.editedItem.amount
			});
		}
		);
	}

	onAddShoppingElement(form: NgForm) {
		const value = form.value;
		const newIngredient = new Ingredient(value.name, value.amount);
		if (this.editMode) {
			// this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
			this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: newIngredient }))
		} else {
			// this.shoppingListService.addIngredient(newIngredient);
			this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
		}
		form.reset();
		this.editMode = false;
	}

	onCleanForm() {
		this.slForm.reset();
		this.editMode = false;
	}
	
	onDelete() {
		// this.shoppingListService.removeIngredient(this.editedItemIndex);
		this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
		this.onCleanForm();
 	 }

}
