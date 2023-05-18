import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "src/app/components/recipes/recipe.model";
import { RecipesService } from "src/app/components/recipes/recipes.service";
import * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";
import * as RecipesActions from '../../components/recipes/store/recipe.actions';

@Injectable({providedIn: "root"})
export class DataStorageService {
    constructor(
        private http: HttpClient,
        private recipeService: RecipesService,
        private store: Store<fromApp.AppState>
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
                // this.recipeService.addRecipes(recipes);
                this.store.dispatch(new RecipesActions.setRecipes(recipes));
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