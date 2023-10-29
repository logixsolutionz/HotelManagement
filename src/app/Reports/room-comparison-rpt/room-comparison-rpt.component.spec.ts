import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomComparisonRptComponent } from './room-comparison-rpt.component';

describe('RoomComparisonRptComponent', () => {
  let component: RoomComparisonRptComponent;
  let fixture: ComponentFixture<RoomComparisonRptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomComparisonRptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomComparisonRptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
