import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CioRptCompanywiseComponent } from './cio-rpt-companywise.component';

describe('CioRptCompanywiseComponent', () => {
  let component: CioRptCompanywiseComponent;
  let fixture: ComponentFixture<CioRptCompanywiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CioRptCompanywiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CioRptCompanywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
