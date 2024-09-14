import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Subscription, map } from 'rxjs';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import * as AuthAction from '../../auth/store/auth.actions'
import * as RecipeAction from '../../components/recipes/store/recipe.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  collapsed = true;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user; // !user ? false : true
    });
  }

  onSaveData() {
    // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipeAction.StoreRecipes());
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipeAction.FetchRecipes());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
  }
}
