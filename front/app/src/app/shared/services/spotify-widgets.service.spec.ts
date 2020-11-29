import { TestBed } from '@angular/core/testing';

import { SpotifyWidgetsService } from './spotify-widgets.service';

describe('SpotifyWidgetsService', () => {
  let service: SpotifyWidgetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyWidgetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
