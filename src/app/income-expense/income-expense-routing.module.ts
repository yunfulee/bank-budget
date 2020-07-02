import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IncomeExpenseComponent } from './income-expense.component';
import { MyAccountBookComponent } from './my-account-book/my-account-book.component';
import { RevenueAnalysisComponent } from './revenue-analysis/revenue-analysis.component';
import { MonthlyBillComponent } from './monthly-bill/monthly-bill.component';
import { TransactionSearchComponent } from './transaction-search/transaction-search.component';
import { TransactionService } from './service/transaction.service';
import { IncomeExpenseTransationDetailComponent } from './income-expense-monthly/income-expense-daily/income-expense-transation-detail/income-expense-transation-detail.component';

const routes: Routes = [
  {
    path: '', component: IncomeExpenseComponent,
    children: [
      {
        path: ':id',
        component: IncomeExpenseTransationDetailComponent,
        resolve: [TransactionService]
      }
    ]
  },
  {
    path: 'revenue-analysis', component: RevenueAnalysisComponent
  },
  {
    path: 'monthly-bill', component: MonthlyBillComponent
  },
  {
    path: 'my-account-book', component: MyAccountBookComponent
  },
  {
    path: 'transaction-search', component: TransactionSearchComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeExpenseRoutingModule { }
