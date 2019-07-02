import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrizeWheelGroupDialogComponent } from './edit-prize-wheel-group-dialog.component';

describe('EditPrizeWheelGroupDialogComponent', () => {
  let component: EditPrizeWheelGroupDialogComponent;
  let fixture: ComponentFixture<EditPrizeWheelGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrizeWheelGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrizeWheelGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
