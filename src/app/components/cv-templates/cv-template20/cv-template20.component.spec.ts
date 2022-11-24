/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CvTemplate20Component } from './cv-template20.component';

describe('CvTemplate20Component', () => {
  let component: CvTemplate20Component;
  let fixture: ComponentFixture<CvTemplate20Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvTemplate20Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTemplate20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
