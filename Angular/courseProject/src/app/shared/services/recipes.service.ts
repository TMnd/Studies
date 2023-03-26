import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "src/app/components/recipes/recipe.model";
import { Ingredient } from "../ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipesService {
    recipesChanged = new Subject<Recipe[]>();

    /*private recipes: Recipe[] = [
        new Recipe("A test recipe","This is simple a test","https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg",
        [
            new Ingredient("Meat",1),
            new Ingredient("French Fries", 20)    
        ]),
        new Recipe("A test recipe2","This is simple a test2","https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHJlY2lwZXxlbnwwfHwwfHw%3D&w=1000&q=80",
        [
            new Ingredient("Buns",2),
            new Ingredient("Meat", 1)    
        ])
    ];*/

    private recipes: Recipe[] = [];

    constructor(
        private shoppingListService: ShoppingListService
    ) {}

    getRecipesList() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredientList(ingredients);
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    getRecipeFromInputList(id:number, recipes: Recipe[]) {
        this.recipes = recipes;
        return this.getRecipe(id);
    }

    addRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    removeRecipe(recipe: Recipe){
        const recipeIndex = this.recipes.indexOf(recipe);
        this.recipes.splice(recipeIndex, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}