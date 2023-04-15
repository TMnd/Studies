import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipiesRoutingModule } from "./recipes.routing.module";
import { RecipesComponent } from "./recipes.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
    declarations: [
        RecipesComponent,  
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        ReactiveFormsModule,
        RecipiesRoutingModule,
        SharedModule
    ],
    exports: [
    ]
})
export class RecipeModule {

}