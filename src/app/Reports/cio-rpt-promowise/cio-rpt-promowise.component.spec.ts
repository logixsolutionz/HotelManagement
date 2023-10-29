import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CioRptPromowiseComponent } from './cio-rpt-promowise.component';

describe('CioRptPromowiseComponent', () => {
  let component: CioRptPromowiseComponent;
  let fixture: ComponentFixture<CioRptPromowiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CioRptPromowiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CioRptPromowiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
