import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { RecipeDetailsResolver } from "./components/recipes/recipe-detail/recipe-detail-resolver.service";
import { RecipeDetailComponent } from "./components/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./components/recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./components/recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: "", redirectTo: "/recipes", pathMatch: 'full'},
    {path: "recipes", component: RecipesComponent, children: [
        { path: "", component: RecipeStartComponent},
        { path: "new", component: RecipeEditComponent},
        { path: ":id", component: RecipeDetailComponent, resolve: {recipeDetail: RecipeDetailsResolver}},
        { path: ":id/edit", component: RecipeEditComponent}
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