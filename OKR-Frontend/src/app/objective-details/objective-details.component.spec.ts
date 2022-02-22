import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectiveDetailsComponent } from './objective-details.component';

describe('ObjectiveDetailsComponent', () => {
  let component: ObjectiveDetailsComponent;
  let fixture: ComponentFixture<ObjectiveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectiveDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
