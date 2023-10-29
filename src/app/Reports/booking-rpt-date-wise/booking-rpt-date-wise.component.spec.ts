import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRptDateWiseComponent } from './booking-rpt-date-wise.component';

describe('BookingRptDateWiseComponent', () => {
  let component: BookingRptDateWiseComponent;
  let fixture: ComponentFixture<BookingRptDateWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingRptDateWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingRptDateWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
