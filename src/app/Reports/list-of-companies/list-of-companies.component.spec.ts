import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCompaniesComponent } from './list-of-companies.component';

describe('ListOfCompaniesComponent', () => {
  let component: ListOfCompaniesComponent;
  let fixture: ComponentFixture<ListOfCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfCompaniesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
