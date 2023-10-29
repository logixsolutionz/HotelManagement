import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRptPartywiseComponent } from './booking-rpt-partywise.component';

describe('BookingRptPartywiseComponent', () => {
  let component: BookingRptPartywiseComponent;
  let fixture: ComponentFixture<BookingRptPartywiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingRptPartywiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingRptPartywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
