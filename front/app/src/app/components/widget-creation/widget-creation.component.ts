import { Component, NgZone, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { Router } from '@angular/router';
import { $ } from 'protractor';
import { AuthService } from '../../shared/services/auth.service';
import { TwitchConnectService } from '../../shared/services/twitch-connect.service';

@Component({
  selector: 'app-widget-creation',
  templateUrl: './widget-creation.component.html',
  styleUrls: ['./widget-creation.component.css']
})
export class WidgetCreationComponent implements OnInit {

  constructor(public twitchService: TwitchConnectService, public authService: AuthService) { }

  ngOnInit(): void {
  }
}
