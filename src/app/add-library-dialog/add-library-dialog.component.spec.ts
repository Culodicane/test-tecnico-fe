import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLibraryDialogComponent } from './add-library-dialog.component';

describe('AddLibraryDialogComponent', () => {
  let component: AddLibraryDialogComponent;
  let fixture: ComponentFixture<AddLibraryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLibraryDialogComponent]
    });
    fixture = TestBed.createComponent(AddLibraryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
