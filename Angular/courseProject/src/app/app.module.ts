import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { DropDownDirective } from './shared/dropdown.directive';
import { RecipesService } from './shared/services/recipes.service';
import { ShoppingListService } from './shared/services/shopping-list.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropDownDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    RecipesService,
    ShoppingListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
