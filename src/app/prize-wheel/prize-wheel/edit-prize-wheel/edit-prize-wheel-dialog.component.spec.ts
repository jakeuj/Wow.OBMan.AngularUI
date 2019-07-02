import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrizeWheelDialogComponent } from './edit-prize-wheel-dialog.component';

describe('EditPrizeWheelDialogComponent', () => {
  let component: EditPrizeWheelDialogComponent;
  let fixture: ComponentFixture<EditPrizeWheelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrizeWheelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrizeWheelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
