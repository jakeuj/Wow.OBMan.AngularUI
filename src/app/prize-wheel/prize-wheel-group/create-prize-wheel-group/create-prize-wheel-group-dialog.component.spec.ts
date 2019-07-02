import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrizeWheelGroupDialogComponent } from './create-prize-wheel-group-dialog.component';

describe('CreatePrizeWheelGroupDialogComponent', () => {
  let component: CreatePrizeWheelGroupDialogComponent;
  let fixture: ComponentFixture<CreatePrizeWheelGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePrizeWheelGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrizeWheelGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
