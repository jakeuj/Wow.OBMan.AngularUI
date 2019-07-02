import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrizeWheelRateDialogComponent } from './edit-prize-wheel-rate-dialog.component';

describe('EditPrizeWheelRateDialogComponent', () => {
  let component: EditPrizeWheelRateDialogComponent;
  let fixture: ComponentFixture<EditPrizeWheelRateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrizeWheelRateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrizeWheelRateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
