import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesRptServiceandDatewiseComponent } from './services-rpt-serviceand-datewise.component';

describe('ServicesRptServiceandDatewiseComponent', () => {
  let component: ServicesRptServiceandDatewiseComponent;
  let fixture: ComponentFixture<ServicesRptServiceandDatewiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesRptServiceandDatewiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesRptServiceandDatewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
