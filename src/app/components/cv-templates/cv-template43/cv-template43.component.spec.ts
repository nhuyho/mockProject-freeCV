import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTemplate43Component } from './cv-template43.component';

describe('CvTemplate43Component', () => {
  let component: CvTemplate43Component;
  let fixture: ComponentFixture<CvTemplate43Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvTemplate43Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTemplate43Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
