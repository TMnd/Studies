import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "src/app/app-routing.module";
import { ShoppingListRoutingModule } from "./shopping-list.routing.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FormsModule,
        ShoppingListRoutingModule
    ]
})
export class ShoppingListModule {}