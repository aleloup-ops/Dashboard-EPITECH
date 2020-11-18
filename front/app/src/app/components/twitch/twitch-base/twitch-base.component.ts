import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable} from 'angular-gridster2';

import { TwitchConnectService } from '../../../shared/services/twitch-connect.service';

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

@Component({
  selector: 'app-twitch-base',
  templateUrl: './twitch-base.component.html',
  styleUrls: ['./twitch-base.component.css']
})

export class TwitchBaseComponent implements OnInit {
  @Input() position: Array<number>;
  @Input() type: string;

  constructor(public twitchService: TwitchConnectService) { }
  item: GridsterItem;

  ngOnInit(): void {
    this.item = {cols: 1, rows: 1, y: this.position[0], x: this.position[1]};
  }

}
