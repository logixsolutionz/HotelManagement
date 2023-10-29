import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcheckINServiceComponent } from './addcheck-inservice.component';

describe('AddcheckINServiceComponent', () => {
  let component: AddcheckINServiceComponent;
  let fixture: ComponentFixture<AddcheckINServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcheckINServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcheckINServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
