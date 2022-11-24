import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCvItemComponent } from './user-cv-item.component';

describe('UserCvItemComponent', () => {
  let component: UserCvItemComponent;
  let fixture: ComponentFixture<UserCvItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCvItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCvItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
