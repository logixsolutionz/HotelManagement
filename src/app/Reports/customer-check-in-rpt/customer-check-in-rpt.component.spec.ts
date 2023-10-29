import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerCheckInRptComponent } from './customer-check-in-rpt.component';

describe('CustomerCheckInRptComponent', () => {
  let component: CustomerCheckInRptComponent;
  let fixture: ComponentFixture<CustomerCheckInRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerCheckInRptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerCheckInRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
