import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import {CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable} from 'angular-gridster2';

import { SaveWidgetsService } from '../../../shared/services/save-widgets.service';

@Component({
  selector: 'app-trello-base',
  templateUrl: './trello-base.component.html',
  styleUrls: ['./trello-base.component.css']
})

export class TrelloBaseComponent implements OnInit {
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
