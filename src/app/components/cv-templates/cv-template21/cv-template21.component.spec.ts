/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CvTemplate21Component } from './cv-template21.component';

describe('CvTemplate21Component', () => {
  let component: CvTemplate21Component;
  let fixture: ComponentFixture<CvTemplate21Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvTemplate21Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvTemplate21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
