import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePlaceholderComponent } from './template-placeholder.component';

describe('TemplatePlaceholderComponent', () => {
  let component: TemplatePlaceholderComponent;
  let fixture: ComponentFixture<TemplatePlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatePlaceholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
