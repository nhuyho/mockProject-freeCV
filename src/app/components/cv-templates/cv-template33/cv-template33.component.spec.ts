import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTemplate33Component } from './cv-template33.component';

describe('CvTemplate33Component', () => {
  let component: CvTemplate33Component;
  let fixture: ComponentFixture<CvTemplate33Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvTemplate33Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTemplate33Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
