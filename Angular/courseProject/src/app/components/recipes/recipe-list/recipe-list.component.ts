import { OnDestroy, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy{
  subscription: Subscription;
  recipes: Recipe[];

  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
    this.subscription = this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipesService.getRecipesList();
  } 

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
