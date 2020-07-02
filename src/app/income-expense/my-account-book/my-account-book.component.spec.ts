import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountBookComponent } from './my-account-book.component';

describe('MyAccountBookComponent', () => {
  let component: MyAccountBookComponent;
  let fixture: ComponentFixture<MyAccountBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
