import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CioRptDateWiseComponent } from './cio-rpt-date-wise.component';

describe('CioRptDateWiseComponent', () => {
  let component: CioRptDateWiseComponent;
  let fixture: ComponentFixture<CioRptDateWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CioRptDateWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CioRptDateWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
