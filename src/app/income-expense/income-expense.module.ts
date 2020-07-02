import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeExpenseCardComponent } from './income-expense-card/income-expense-card.component';
import { IncomeExpenseSubMenuComponent } from './income-expense-sub-menu/income-expense-sub-menu.component';
import { IncomeExpenseMonthlyComponent } from './income-expense-monthly/income-expense-monthly.component';
import { IncomeExpenseDailyComponent } from './income-expense-monthly/income-expense-daily/income-expense-daily.component';
import { IncomeExpenseTransationDetailComponent } from './income-expense-monthly/income-expense-daily/income-expense-transation-detail/income-expense-transation-detail.component';
import { IncomeExpenseComponent } from './income-expense.component';
import { IncomeExpenseRoutingModule } from './income-expense-routing.module';



@NgModule({
  declarations: [IncomeExpenseCardComponent,
    IncomeExpenseSubMenuComponent,
    IncomeExpenseMonthlyComponent,
    IncomeExpenseDailyComponent,
    IncomeExpenseTransationDetailComponent,
    IncomeExpenseComponent,],
  imports: [
    CommonModule, IncomeExpenseRoutingModule
  ],
  exports: [IncomeExpenseCardComponent,
    IncomeExpenseSubMenuComponent,
    IncomeExpenseMonthlyComponent,
    IncomeExpenseDailyComponent,
    IncomeExpenseTransationDetailComponent,
    IncomeExpenseComponent]
})
export class IncomeExpenseModule { }
