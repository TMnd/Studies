import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { RecipeDetailsResolver } from "./components/recipes/recipe-detail/recipe-detail-resolver.service";
import { RecipeDetailComponent } from "./components/recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./components/recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: "", redirectTo: "/recipes", pathMatch: 'full'},
    {path: "recipes", component: RecipesComponent, children: [
        { path: "", component: RecipeStartComponent},
        { path: ":id", component: RecipeDetailComponent, resolve: {recipeDetail: RecipeDetailsResolver}},
    ]},
    {path: "shoppingList", component: ShoppingListComponent},
];


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}