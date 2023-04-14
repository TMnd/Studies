import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipiesRoutingModule } from "./recipes.routing.module";
import { RecipesComponent } from "./recipes.component";
import { DropDownDirective } from "src/app/shared/dropdown.directive";

@NgModule({
    declarations: [
        RecipesComponent,  
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        DropDownDirective
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule,
        RecipiesRoutingModule
    ],
    exports: [
        DropDownDirective
    ]
})
export class RecipeModule {

}