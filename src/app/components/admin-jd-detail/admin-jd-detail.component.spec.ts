import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJdDetailComponent } from './admin-jd-detail.component';

describe('AdminJdDetailComponent', () => {
  let component: AdminJdDetailComponent;
  let fixture: ComponentFixture<AdminJdDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJdDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
