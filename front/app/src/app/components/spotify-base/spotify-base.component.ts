import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable} from 'angular-gridster2';

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

@Component({
  selector: 'app-spotify-base',
  templateUrl: './spotify-base.component.html',
  styleUrls: ['./spotify-base.component.css']
})
export class SpotifyBaseComponent implements OnInit {

  constructor() { }
  item: GridsterItem;

  ngOnInit(): void {
    this.item = {cols: 1, rows: 1, y: 0, x: 0};
  }

}
