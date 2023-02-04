import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Ingredient } from "src/app/shared/ingredient.model";
import { RecipesService } from "src/app/shared/services/recipes.service";
import { Recipe } from "../recipe.model";

interface RecipeType {
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];
}


@Injectable()
export class RecipeDetailsResolver implements Resolve<RecipeType> {

    constructor(
        private recipeService: RecipesService
    ){}
    
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): RecipeType | Observable<RecipeType> | Promise<RecipeType> {
        const id = +route.params['id'];
        return this.recipeService.getRecipe(id);
    }

}