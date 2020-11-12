import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable} from 'angular-gridster2';

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

@Component({
  selector: 'app-twitter-base',
  templateUrl: './twitter-base.component.html',
  styleUrls: ['./twitter-base.component.css']
})
export class TwitterBaseComponent implements OnInit {

  constructor() { }
  item: GridsterItem;

  ngOnInit(): void {
    this.item = {cols: 1, rows: 1, y: 0, x: 0};
  }

}
