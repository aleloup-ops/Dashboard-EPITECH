import { TestBed } from '@angular/core/testing';

import { TwitchConnectService } from './twitch-connect.service';

describe('TwitchConnectService', () => {
  let service: TwitchConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitchConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
