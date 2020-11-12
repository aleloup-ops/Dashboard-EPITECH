import { Component, NgZone, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-widget-creation',
  templateUrl: './widget-creation.component.html',
  styleUrls: ['./widget-creation.component.css']
})
export class WidgetCreationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
