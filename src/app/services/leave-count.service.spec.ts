import { TestBed } from '@angular/core/testing';

import { LeaveCountService } from './leave-count.service';

describe('LeaveCountService', () => {
  let service: LeaveCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
