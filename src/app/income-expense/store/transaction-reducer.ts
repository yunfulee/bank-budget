import { TransactionBill } from '../model/transaction-bill.model';
import * as TransactionsActions from './transaction.actions';

export interface State {
  transactions: TransactionBill[];
}

const initialState: State = {
  transactions: [{
    "description": "this is for coffee",
    "amount": "$12",
    "type": "expense",

  },
  {
    "description": "this is for salary",
    "amount": "$1200",
    "type": "income",

  },
  {
    "description": "this is for book",
    "amount": "$12",
    "type": "expense",

  }]
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
