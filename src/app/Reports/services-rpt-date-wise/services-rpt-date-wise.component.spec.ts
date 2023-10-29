import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesRptDateWiseComponent } from './services-rpt-date-wise.component';

describe('ServicesRptDateWiseComponent', () => {
  let component: ServicesRptDateWiseComponent;
  let fixture: ComponentFixture<ServicesRptDateWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesRptDateWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesRptDateWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
