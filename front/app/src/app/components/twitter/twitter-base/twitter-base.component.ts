import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable} from 'angular-gridster2';
import { SaveWidgetsService } from '../../../shared/services/save-widgets.service';

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
  @Input() position: Array<number>;
  @Input() type: string;
  @Input() widget_id: string;
  @Input() param: string;

  constructor(public deleteService: SaveWidgetsService) { }
  item: GridsterItem;
  state: boolean;

  ngOnInit(): void {
    this.item = {cols: 1, rows: 1, y: this.position[0], x: this.position[1]};
    this.state = true;
  }

  deleteWidget() {
    this.deleteService.deleteWidget(JSON.parse(localStorage.getItem('user')).uid, this.widget_id);
    this.state = false;
  }

}
