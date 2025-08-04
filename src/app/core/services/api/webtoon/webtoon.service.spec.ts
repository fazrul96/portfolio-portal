import { TestBed } from '@angular/core/testing';

import { WebtoonService } from './webtoon.service';

describe('WebtoonService', () => {
  let service: WebtoonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebtoonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
