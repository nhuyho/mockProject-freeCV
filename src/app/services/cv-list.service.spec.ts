import { TestBed } from '@angular/core/testing';

import { CvListService } from './cv-list.service';

describe('CvListService', () => {
  let service: CvListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
