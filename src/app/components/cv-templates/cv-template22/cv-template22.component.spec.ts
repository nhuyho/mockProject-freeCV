import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTemplate22Component } from './cv-template22.component';

describe('CvTemplate22Component', () => {
  let component: CvTemplate22Component;
  let fixture: ComponentFixture<CvTemplate22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvTemplate22Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTemplate22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
