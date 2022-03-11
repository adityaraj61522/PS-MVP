import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveUploadComponent } from './objective-upload.component';

describe('ObjectiveUploadComponent', () => {
  let component: ObjectiveUploadComponent;
  let fixture: ComponentFixture<ObjectiveUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectiveUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
