import { Component, OnInit } from '@angular/core';
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

  constructor(public twitchService: TwitchConnectService) { }
  item: GridsterItem;

  ngOnInit(): void {
    this.item = {cols: 2, rows: 2, y: 0, x: 0};
  }

}
