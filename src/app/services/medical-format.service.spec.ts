import { TestBed } from '@angular/core/testing';

import { MedicalFormatService } from './medical-format.service';

describe('MedicalFormatService', () => {
  let service: MedicalFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
