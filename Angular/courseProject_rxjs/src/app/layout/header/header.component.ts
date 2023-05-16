import { OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import * as AuthAction from '../../auth/store/auth.actions'

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
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user; // !user ? false : true
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthAction.Logout());
  }
}
