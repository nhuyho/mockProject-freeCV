import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCvListComponent } from './user-cv-list.component';

describe('UserCvListComponent', () => {
  let component: UserCvListComponent;
  let fixture: ComponentFixture<UserCvListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCvListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
