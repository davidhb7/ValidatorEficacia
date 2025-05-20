import { TestBed } from '@angular/core/testing';

import { FotoStoreageService } from './foto-storeage.service';

describe('FotoStoreageService', () => {
  let service: FotoStoreageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoStoreageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
