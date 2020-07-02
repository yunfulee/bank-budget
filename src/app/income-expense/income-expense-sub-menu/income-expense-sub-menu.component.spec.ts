import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpenseSubMenuComponent } from './income-expense-sub-menu.component';

describe('IncomeExpenseSubMenuComponent', () => {
  let component: IncomeExpenseSubMenuComponent;
  let fixture: ComponentFixture<IncomeExpenseSubMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeExpenseSubMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeExpenseSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
