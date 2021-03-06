import { Action } from '@ngrx/store';
import { TransactionBill } from '../model/transaction-bill.model';

export const SET_TRANSACTION = '[Transaction] Set transaction';
export const FETCH_TRANSACTION = '[Transaction] Fetch trnsaction';
export const ADD_TRANSACTION = '[Transaction] add transaction';
// FILTER ...

export class SetTransaction implements Action {
  readonly type = SET_TRANSACTION;
  constructor(public payload: TransactionBill[]){}
}

export class FetchTransaction implements Action {
  readonly type = FETCH_TRANSACTION;
}

export class AddTransaction implements Action {
  readonly type = ADD_TRANSACTION;
}

export type TransactionAction = SetTransaction | FetchTransaction;
