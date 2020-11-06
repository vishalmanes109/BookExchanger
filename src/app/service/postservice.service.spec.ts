import { TestBed } from '@angular/core/testing';

import { PostserviceService } from './postservice.service';

describe('PostserviceService', () => {
  let service: PostserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
