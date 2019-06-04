import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityDetailDialogComponent } from './create-activity-detail-dialog.component';

describe('CreateActivityDetailDialogComponent', () => {
  let component: CreateActivityDetailDialogComponent;
  let fixture: ComponentFixture<CreateActivityDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActivityDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActivityDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
