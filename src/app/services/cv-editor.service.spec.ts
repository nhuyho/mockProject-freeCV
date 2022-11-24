import { TestBed } from '@angular/core/testing';

import { CvEditorService } from './cv-editor.service';

describe('CvEditorService', () => {
  let service: CvEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
