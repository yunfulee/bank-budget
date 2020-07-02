import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import { TransactionBill } from '../income-expense/model/transaction-bill.model';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.scss']
})
export class IncomeExpenseComponent implements OnInit, OnDestroy{
  transactions: TransactionBill[];
  subscription: Subscription;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('transactions')
      .pipe(map(transactionState => transactionState.transactions))
      .subscribe((transactions: TransactionBill[]) => {
      this.transactions = transactions;
    });
    console.log(this.transactions);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}



