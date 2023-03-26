import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { DataStorageService } from "src/app/shared/services/data-storage.service";
import { RecipesService } from "src/app/shared/services/recipes.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: "root"})
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(
        private dataStorageService: DataStorageService,
        private recipeService: RecipesService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeService.getRecipesList();
        if(recipes.length == 0){
            return this.dataStorageService.fetchRecipes(); //The resolver will subsbricebe auto before the data load
        } else {
            return recipes;
        }
    }

}