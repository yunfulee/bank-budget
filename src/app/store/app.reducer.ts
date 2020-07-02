import * as fromTransactions from '../income-expense/store/transaction-reducer';
import { ActionReducerMap } from '@ngrx/store';
export interface AppState {
  transactions: fromTransactions.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  transactions: fromTransactions.TransactionReducer
}
