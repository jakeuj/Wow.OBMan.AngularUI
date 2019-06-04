import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActivityDetailDialogComponent } from './edit-activity-detail-dialog.component';

describe('EditActivityDetailDialogComponent', () => {
  let component: EditActivityDetailDialogComponent;
  let fixture: ComponentFixture<EditActivityDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActivityDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActivityDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
