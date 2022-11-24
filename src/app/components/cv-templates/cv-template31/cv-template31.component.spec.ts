/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CvTemplate31Component } from './cv-template31.component';

describe('CvTemplate31Component', () => {
  let component: CvTemplate31Component;
  let fixture: ComponentFixture<CvTemplate31Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvTemplate31Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTemplate31Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
