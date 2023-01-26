import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{
  @Output() selectRecipe = new EventEmitter<Recipe>;

  recipes: Recipe[] = [
    new Recipe("A test recipe","This is simple a test","https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"),
    new Recipe("A test recipe2","This is simple a test2","https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg")
  ];

  onSelectRecipe(recipe: Recipe){
    this.selectRecipe.emit(recipe);
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
