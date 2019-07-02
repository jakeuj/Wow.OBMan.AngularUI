import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeWheelGroupComponent } from './prize-wheel-group.component';

describe('PrizeWheelGroupComponent', () => {
  let component: PrizeWheelGroupComponent;
  let fixture: ComponentFixture<PrizeWheelGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeWheelGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeWheelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
