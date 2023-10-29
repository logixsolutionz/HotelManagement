import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfPromoComponent } from './list-of-promo.component';

describe('ListOfPromoComponent', () => {
  let component: ListOfPromoComponent;
  let fixture: ComponentFixture<ListOfPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfPromoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
