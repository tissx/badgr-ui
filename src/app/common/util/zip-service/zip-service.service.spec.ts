import { TestBed } from '@angular/core/testing';

import { ZipService } from './zip-service.service';

describe('ZipServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZipService = TestBed.get(ZipService);
    expect(service).toBeTruthy();
  });
});
