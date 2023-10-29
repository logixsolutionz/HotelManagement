import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CioDetailsComponent } from './cio-details.component';

describe('CioDetailsComponent', () => {
  let component: CioDetailsComponent;
  let fixture: ComponentFixture<CioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CioDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
