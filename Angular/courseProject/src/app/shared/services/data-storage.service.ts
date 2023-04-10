import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { Recipe } from "src/app/components/recipes/recipe.model";
import { RecipesService } from "./recipes.service";

@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipesService,
        private authService: AuthService
    ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipesList();
        this.http.put(
            'https://angular-course-project-5cdd9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', 
            recipes
        )
        .subscribe(response => {
            console.log(response);
        })
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(
            'https://angular-course-project-5cdd9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        ).pipe(
            map( recipes => {
                return recipes.map(recipe => {
                    //In case the recipe saved doesn't have the ingredients when fetched
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                });
            }),
            tap(recipes => {
                this.recipeService.addRecipes(recipes);
            })
        );
        //Only take 1 value from observable and unsubscribe
        /* return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {
                return this.http.get<Recipe[]>(
                    'https://angular-course-project-5cdd9-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
                    {
                        params: new HttpParams().set('auth',user.to)
                    }
                )  
            }),
            map( recipes => {
                return recipes.map(recipe => {
                    //In case the recipe saved doesn't have the ingredients when fetched.
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                });
            }),
            tap(recipes => {
                this.recipeService.addRecipes(recipes);
            })
        ); */
    }
}