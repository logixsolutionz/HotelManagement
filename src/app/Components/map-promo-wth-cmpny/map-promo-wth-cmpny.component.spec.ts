import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPromoWthCmpnyComponent } from './map-promo-wth-cmpny.component';

describe('MapPromoWthCmpnyComponent', () => {
  let component: MapPromoWthCmpnyComponent;
  let fixture: ComponentFixture<MapPromoWthCmpnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPromoWthCmpnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPromoWthCmpnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
