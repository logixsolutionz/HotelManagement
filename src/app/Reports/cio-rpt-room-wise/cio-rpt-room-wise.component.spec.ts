import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CioRptRoomWiseComponent } from './cio-rpt-room-wise.component';

describe('CioRptRoomWiseComponent', () => {
  let component: CioRptRoomWiseComponent;
  let fixture: ComponentFixture<CioRptRoomWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CioRptRoomWiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CioRptRoomWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
