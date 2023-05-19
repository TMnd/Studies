import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import * as RecipeAction from '../store/recipe.actions';
import * as ShoppingListActions from '../../../components/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ){}

  ngOnInit(): void {
    this.route.params
    .pipe(
      map(params => {
        return +params['id'];
      }),
      switchMap (id => {
        this.id = id;
        return this.store.select('recipes')
      }),
      map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      }
    ))
    .subscribe(recipe => {
      this.recipe = recipe;
    })
  }

  toShoppingList(){
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    // this.recipeService.removeRecipe(this.recipe);
    this.store.dispatch(new RecipeAction.DeleteRecipe(this.id));
    this.router.navigate(['recipes']);
  }

}
