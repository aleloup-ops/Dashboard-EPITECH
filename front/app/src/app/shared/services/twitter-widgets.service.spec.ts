import { TestBed } from '@angular/core/testing';

import { TwitterWidgetsService } from './twitter-widgets.service';

describe('TwitterWidgetsService', () => {
  let service: TwitterWidgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitterWidgetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
