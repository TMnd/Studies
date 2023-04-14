import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListService } from './components/shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-intercetor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceHolderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesService } from './components/recipes/recipes.service';
import { RecipeModule } from './components/recipes/recipes.module';
import { ShoppingListModule } from './components/shopping-list/shooping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipeModule,
    ShoppingListModule
  ],
  providers: [
    RecipesService,
    ShoppingListService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
