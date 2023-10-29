import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CioRptTypeDatewiseComponent } from './cio-rpt-type-datewise.component';

describe('CioRptTypeDatewiseComponent', () => {
  let component: CioRptTypeDatewiseComponent;
  let fixture: ComponentFixture<CioRptTypeDatewiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CioRptTypeDatewiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CioRptTypeDatewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
