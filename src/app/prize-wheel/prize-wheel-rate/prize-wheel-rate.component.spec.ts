import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeWheelRateComponent } from './prize-wheel-rate.component';

describe('PrizeWheelRateComponent', () => {
  let component: PrizeWheelRateComponent;
  let fixture: ComponentFixture<PrizeWheelRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeWheelRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeWheelRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
