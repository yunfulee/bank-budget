import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseMonthlyComponent } from './income-expense-monthly.component';

describe('IncomeExpenseMonthlyComponent', () => {
  let component: IncomeExpenseMonthlyComponent;
  let fixture: ComponentFixture<IncomeExpenseMonthlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeExpenseMonthlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpenseMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
