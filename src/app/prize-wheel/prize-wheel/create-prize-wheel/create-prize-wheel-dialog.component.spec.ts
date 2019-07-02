import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrizeWheelDialogComponent } from './create-prize-wheel-dialog.component';

describe('CreatePrizeWheelDialogComponent', () => {
  let component: CreatePrizeWheelDialogComponent;
  let fixture: ComponentFixture<CreatePrizeWheelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePrizeWheelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrizeWheelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
