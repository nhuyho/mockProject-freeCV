import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClonedTemplateComponent } from './cloned-template.component';

describe('ClonedTemplateComponent', () => {
  let component: ClonedTemplateComponent;
  let fixture: ComponentFixture<ClonedTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClonedTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClonedTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
