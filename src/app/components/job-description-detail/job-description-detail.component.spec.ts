import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionDetailComponent } from './job-description-detail.component';

describe('JobDescriptionDetailComponent', () => {
  let component: JobDescriptionDetailComponent;
  let fixture: ComponentFixture<JobDescriptionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDescriptionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
