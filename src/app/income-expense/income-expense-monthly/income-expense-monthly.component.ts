import { Component, OnInit, Input } from '@angular/core';
import { TransactionBill } from '../model/transaction-bill.model';
import { Store } from '@ngrx/store';
import * as FormApp from '../../store/app.reducer';
import { Observable } from 'rxjs';
import { TransactionSearchComponent } from '../transaction-search/transaction-search.component';


@Component({
  selector: 'app-income-expense-monthly',
  templateUrl: './income-expense-monthly.component.html',
  styleUrls: ['./income-expense-monthly.component.scss']
})
export class IncomeExpenseMonthlyComponent implements OnInit {

  constructor(private store: Store<FormApp.AppState>) { }
  @Input() transactions: TransactionBill[];
  ngOnInit(): void {

  }

}
