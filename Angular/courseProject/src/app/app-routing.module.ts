import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeDetailComponent } from "./components/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./components/recipes/recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./components/recipes/recipe-resolver.service";
import { RecipeStartComponent } from "./components/recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: "", redirectTo: "/recipes", pathMatch: 'full'},
    {path: "recipes", component: RecipesComponent, children: [
        { path: "", component: RecipeStartComponent, resolve: [RecipeResolverService]},
        { path: "new", component: RecipeEditComponent},
        { path: ":id", component: RecipeDetailComponent, resolve: [RecipeResolverService]},
        { path: ":id/edit", component: RecipeEditComponent, resolve: [RecipeResolverService]}
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