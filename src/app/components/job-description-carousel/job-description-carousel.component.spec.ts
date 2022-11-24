import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionCarouselComponent } from './job-description-carousel.component';

describe('JobDescriptionCarouselComponent', () => {
  let component: JobDescriptionCarouselComponent;
  let fixture: ComponentFixture<JobDescriptionCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDescriptionCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
