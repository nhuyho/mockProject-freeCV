import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionItemComponent } from './job-description-item.component';

describe('JobDescriptionItemComponent', () => {
  let component: JobDescriptionItemComponent;
  let fixture: ComponentFixture<JobDescriptionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDescriptionItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
