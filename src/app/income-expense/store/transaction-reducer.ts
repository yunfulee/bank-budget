import { TransactionBill } from '../model/transaction-bill.model';
import * as TransactionsActions from './transaction.actions';

export interface State {
  transactions: TransactionBill[];
}

const initialState: State = {
  transactions: []
}

export function TransactionReducer(
  state = initialState,
  action: TransactionsActions.TransactionAction
) {
  switch (action.type) {
    case TransactionsActions.SET_TRANSACTION:
      return {
        ...state,
        transactions: [...action.payload]
      };
      // '''ADD ,FILTER....
    default:
      return state;
  }
}
