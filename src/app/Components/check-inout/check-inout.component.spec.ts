import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckINOUtComponent } from './check-inout.component';

describe('CheckINOUtComponent', () => {
  let component: CheckINOUtComponent;
  let fixture: ComponentFixture<CheckINOUtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckINOUtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckINOUtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
