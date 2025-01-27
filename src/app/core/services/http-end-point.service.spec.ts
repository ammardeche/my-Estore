import { TestBed } from '@angular/core/testing';

import { HttpEndPointService } from './http-end-point.service';

describe('HttpEndPointService', () => {
  let service: HttpEndPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpEndPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
