import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[];
  
  constructor(
    private shoppingListService: ShoppingListService
  ){}

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  addToShoppingList(newIngredient: Ingredient){
    this.ingredients.push(newIngredient);
  }
}
