import { TestBed } from '@angular/core/testing';

import { ZipServiceService } from './zip-service.service';

describe('ZipServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZipServiceService = TestBed.get(ZipServiceService);
    expect(service).toBeTruthy();
  });
});
