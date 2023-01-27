import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/shared/services/recipes.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{
  selectedRecipe: Recipe;

  constructor(
    private recipesService: RecipesService
  ){}

  ngOnInit() {
    this.recipesService.recipeSelected.subscribe((recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
