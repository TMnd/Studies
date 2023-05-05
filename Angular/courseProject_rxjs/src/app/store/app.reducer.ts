import * as fromShoppingList from '../components/shopping-list/store/shopping-list.reducer'
import * as fromAutg from '../auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAutg.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer, 
    auth: fromAutg.authReducer
  }