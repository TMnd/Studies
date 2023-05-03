import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Observable<{ingredients: Ingredient[]}>; //In hte html is necessary a pipe, ex: *ngFor="let ingredient of (ingredients | async ).ingredients; let i = index"
  private subscription: Subscription;
  
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ){}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
    //   this.ingredients = ingredients;
    // })
  }

  onEditItem(index: number) {
    // this.shoppingListService.startingEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
