import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseDailyComponent } from './income-expense-daily.component';

describe('IncomeExpenseDailyComponent', () => {
  let component: IncomeExpenseDailyComponent;
  let fixture: ComponentFixture<IncomeExpenseDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeExpenseDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpenseDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
