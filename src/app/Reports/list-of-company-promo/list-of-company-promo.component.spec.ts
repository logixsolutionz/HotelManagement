import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfCompanyPromoComponent } from './list-of-company-promo.component';

describe('ListOfCompanyPromoComponent', () => {
  let component: ListOfCompanyPromoComponent;
  let fixture: ComponentFixture<ListOfCompanyPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfCompanyPromoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfCompanyPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
