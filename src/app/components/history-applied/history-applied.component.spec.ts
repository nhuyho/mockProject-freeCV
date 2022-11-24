import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAppliedComponent } from './history-applied.component';

describe('HistoryAppliedComponent', () => {
  let component: HistoryAppliedComponent;
  let fixture: ComponentFixture<HistoryAppliedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryAppliedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAppliedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
