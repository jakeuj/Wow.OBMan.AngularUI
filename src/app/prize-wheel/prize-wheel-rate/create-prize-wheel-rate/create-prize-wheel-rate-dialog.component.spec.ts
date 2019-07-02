import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrizeWheelRateDialogComponent } from './create-prize-wheel-rate-dialog.component';

describe('CreatePrizeWheelRateDialogComponent', () => {
  let component: CreatePrizeWheelRateDialogComponent;
  let fixture: ComponentFixture<CreatePrizeWheelRateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePrizeWheelRateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrizeWheelRateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
