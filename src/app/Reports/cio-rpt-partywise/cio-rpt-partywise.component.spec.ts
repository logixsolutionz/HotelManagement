import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CioRptPartywiseComponent } from './cio-rpt-partywise.component';

describe('CioRptPartywiseComponent', () => {
  let component: CioRptPartywiseComponent;
  let fixture: ComponentFixture<CioRptPartywiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CioRptPartywiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CioRptPartywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
