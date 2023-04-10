import { TestBed } from '@angular/core/testing';

import { LeaveDaysService } from './leave-days.service';

describe('LeaveDaysService', () => {
  let service: LeaveDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
