import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneReuseComponent } from './milestone-reuse.component';

describe('MilestoneReuseComponent', () => {
  let component: MilestoneReuseComponent;
  let fixture: ComponentFixture<MilestoneReuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilestoneReuseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneReuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
