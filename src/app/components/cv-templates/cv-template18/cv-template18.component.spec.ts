import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTemplate18Component } from './cv-template18.component';

describe('CvTemplate18Component', () => {
  let component: CvTemplate18Component;
  let fixture: ComponentFixture<CvTemplate18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvTemplate18Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTemplate18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
