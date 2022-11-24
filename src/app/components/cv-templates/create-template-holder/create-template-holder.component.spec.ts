import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTemplateHolderComponent } from './create-template-holder.component';

describe('CreateTemplateHolderComponent', () => {
  let component: CreateTemplateHolderComponent;
  let fixture: ComponentFixture<CreateTemplateHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTemplateHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTemplateHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
