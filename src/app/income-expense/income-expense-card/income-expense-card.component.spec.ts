import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseCardComponent } from './income-expense-card.component';

describe('IncomeExpenseCardComponent', () => {
  let component: IncomeExpenseCardComponent;
  let fixture: ComponentFixture<IncomeExpenseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeExpenseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpenseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
