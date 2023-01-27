import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "src/app/components/recipes/recipe.model";

@Injectable()
export class RecipesService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe("A test recipe","This is simple a test","https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"),
        new Recipe("A test recipe2","This is simple a test2","https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg")
    ];

    getRecipesList() {
        return this.recipes.slice();
    }
}