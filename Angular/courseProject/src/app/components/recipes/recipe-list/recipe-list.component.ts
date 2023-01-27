import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  // @Output() selectRecipe = new EventEmitter<Recipe>;

  recipes: Recipe[];

  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipesList();
  }

  onSelectRecipe(recipe: Recipe){
    this.recipesService.recipeSelected.emit(recipe);
  }
  

}