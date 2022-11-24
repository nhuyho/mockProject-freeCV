import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTemplate15Component } from './cv-template15.component';

describe('CvTemplate15Component', () => {
  let component: CvTemplate15Component;
  let fixture: ComponentFixture<CvTemplate15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvTemplate15Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTemplate15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
