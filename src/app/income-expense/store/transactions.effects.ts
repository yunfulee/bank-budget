import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap , map } from 'rxjs/operators';

import * as FormApp from '../../store/app.reducer';
import * as TransactionActions from './transaction.actions';
import { Injectable } from '@angular/core';
import { TransactionBill } from '../model/transaction-bill.model';
@Injectable()
export class TransactionsEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<FormApp.AppState>
  ) { }

  @Effect()
  fetchTransactions = this.actions$.pipe(
    ofType(TransactionActions.FETCH_TRANSACTION),
    switchMap(() => {
      return this.http.get<TransactionBill[]>(
        'assets/mock-data/transactions-mock.json'
      );
    }),
    map(transactions => {
      return new TransactionActions.SetTransaction(transactions);
    })
  );

}
