import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, take, switchMap } from 'rxjs/operators';

import { TransactionBill } from '../model/transaction-bill.model';
import * as fromApp from '../../store/app.reducer';
import * as TransactionActions from '../store/transaction.actions';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionService implements Resolve<TransactionBill[]> {

  constructor(
    private store: Store<fromApp.AppState>,
    private actions: Actions
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('transactions').pipe(
      take(1),
      map(transactionState => {
        return transactionState.transactions;
      }),
      switchMap(transactions => {
        if (transactions.length === 0) {
          this.store.dispatch(new TransactionActions.FetchTransaction());
          return this.actions.pipe(
            ofType(TransactionActions.FETCH_TRANSACTION),
            take(1)
          );
        }
        else {
          return of(transactions);
        }
      })
    );
  }
}
