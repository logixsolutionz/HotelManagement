import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoRatesComponent } from './promo-rates.component';

describe('PromoRatesComponent', () => {
  let component: PromoRatesComponent;
  let fixture: ComponentFixture<PromoRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
