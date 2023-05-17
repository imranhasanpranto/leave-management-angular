import { TestBed } from '@angular/core/testing';

import { UserCacheServiceService } from './user-cache-service.service';

describe('UserCacheServiceService', () => {
  let service: UserCacheServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCacheServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
