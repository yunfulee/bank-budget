import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseTransationDetailComponent } from './income-expense-transation-detail.component';

describe('IncomeExpenseTransationDetailComponent', () => {
  let component: IncomeExpenseTransationDetailComponent;
  let fixture: ComponentFixture<IncomeExpenseTransationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeExpenseTransationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpenseTransationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
