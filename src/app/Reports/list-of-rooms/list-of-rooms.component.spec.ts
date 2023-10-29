import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfRoomsComponent } from './list-of-rooms.component';

describe('ListOfRoomsComponent', () => {
  let component: ListOfRoomsComponent;
  let fixture: ComponentFixture<ListOfRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
