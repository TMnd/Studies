import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
    {path: "", redirectTo: "/recipes", pathMatch: 'full'},
    {path: 'recipes', loadChildren: () => import('./components/recipes/recipes.module').then((mod) => mod.RecipeModule), },
    {path: 'shoppingList', loadChildren: () => import('./components/shopping-list/shooping-list.module').then((mod) => mod.ShoppingListModule), },
    {path: 'auth', loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule), }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {useHash: true, preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}