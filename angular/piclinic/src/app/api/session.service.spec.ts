import { TestBed } from '@angular/core/testing';

import { piClinicSession } from './session.service';

describe('piClinicSession', () => {
  let service: piClinicSession;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(piClinicSession);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
