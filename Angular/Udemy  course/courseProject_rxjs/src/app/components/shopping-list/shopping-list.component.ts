import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]}>; //In hte html is necessary a pipe, ex: *ngFor="let ingredient of (ingredients | async ).ingredients; let i = index"
  
  constructor(
    private store: Store<fromApp.AppState>
  ){}

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    // this.shoppingListService.startingEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
