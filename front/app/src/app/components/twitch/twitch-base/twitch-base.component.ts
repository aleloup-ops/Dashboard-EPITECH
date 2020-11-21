import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable} from 'angular-gridster2';

import { TwitchConnectService } from '../../../shared/services/twitch-connect.service';
import { SaveWidgetsService } from '../../../shared/services/save-widgets.service';

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
  @Input() widget_id: string;

  constructor(public deleteService: SaveWidgetsService) { }
  item: GridsterItem;
  state: boolean;

  ngOnInit(): void {
    this.item = {cols: 1, rows: 1, y: this.position[0], x: this.position[1]};
    this.state = true;
  }

  deleteWidget($event: MouseEvent | TouchEvent) {
    this.deleteService.deleteWidget(JSON.parse(localStorage.getItem('user')).uid, this.widget_id);
    this.state = false;
  }

}
