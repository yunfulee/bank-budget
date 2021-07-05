import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeExpenseCardComponent } from './income-expense-card/income-expense-card.component';
import { IncomeExpenseSubMenuComponent } from './income-expense-sub-menu/income-expense-sub-menu.component';
import { IncomeExpenseMonthlyComponent } from './income-expense-monthly/income-expense-monthly.component';
import { IncomeExpenseComponent } from './income-expense.component';
import { IncomeExpenseRoutingModule } from './income-expense-routing.module';



@NgModule({
  declarations: [IncomeExpenseCardComponent,
    IncomeExpenseSubMenuComponent,
    IncomeExpenseMonthlyComponent,
    IncomeExpenseComponent,],
  imports: [
    CommonModule, IncomeExpenseRoutingModule
  ],
  exports: [IncomeExpenseCardComponent,
    IncomeExpenseSubMenuComponent,
    IncomeExpenseMonthlyComponent,
    IncomeExpenseComponent]
})
export class IncomeExpenseModule { }
