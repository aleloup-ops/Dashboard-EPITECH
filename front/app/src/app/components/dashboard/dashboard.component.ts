import { Component, NgZone, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { SaveWidgetsService } from '../../shared/services/save-widgets.service'

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable } from 'angular-gridster2';

interface Safe extends GridsterConfig {
    draggable: Draggable;
    resizable: Resizable;
    pushDirections: PushDirections;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    constructor(public authService: AuthService, public router: Router, public ngZone: NgZone,
        public save: SaveWidgetsService, private elementRef: ElementRef) {

            setTimeout(() => {
                console.log(JSON.parse(localStorage.getItem('user')));
    
                this.showWaiting = false;
            }, 4000);

        }

    options: Safe;
    dashboard: Array<GridsterItem>;
    gridData;

    showWaiting: boolean = true;

    ngOnInit(): void {

        if (this.showWaiting == false) {
            this.gridData = this.save.getData(JSON.parse(localStorage.getItem('user')).uid).subscribe(response => {
                this.gridData = response.widget;
            })
        }

        this.options = {
            gridType: GridType.Fit,
            compactType: CompactType.None,
            margin: 10,
            outerMargin: true,
            outerMarginTop: null,
            outerMarginRight: null,
            outerMarginBottom: null,
            outerMarginLeft: null,
            useTransformPositioning: true,
            mobileBreakpoint: 640,
            minCols: 1,
            maxCols: 100,
            minRows: 1,
            maxRows: 100,
            maxItemCols: 100,
            minItemCols: 1,
            maxItemRows: 100,
            minItemRows: 1,
            maxItemArea: 2500,
            minItemArea: 1,
            defaultItemCols: 1,
            defaultItemRows: 1,
            fixedColWidth: 105,
            fixedRowHeight: 105,
            keepFixedHeightInMobile: false,
            keepFixedWidthInMobile: false,
            scrollSensitivity: 10,
            scrollSpeed: 20,
            enableEmptyCellClick: false,
            enableEmptyCellContextMenu: false,
            enableEmptyCellDrop: false,
            enableEmptyCellDrag: false,
            enableOccupiedCellDrop: false,
            emptyCellDragMaxCols: 50,
            emptyCellDragMaxRows: 50,
            ignoreMarginInRow: false,
            draggable: {
                enabled: true,
            },
            resizable: {
                enabled: false,
            },
            swap: false,
            pushItems: true,
            disablePushOnDrag: false,
            disablePushOnResize: false,
            pushDirections: {north: true, east: true, south: true, west: true},
            pushResizeItems: false,
            displayGrid: DisplayGrid.None,
            disableWindowResize: false,
            disableWarnings: false,
            scrollToNewItems: false
        };

        this.dashboard = [
            {cols: 2, rows: 1, y: 0, x: 0},
            {cols: 2, rows: 2, y: 0, x: 2, hasContent: true},
            {cols: 1, rows: 1, y: 0, x: 4},
            {cols: 1, rows: 1, y: 2, x: 5},
            {cols: 1, rows: 1, y: 1, x: 0},
            {cols: 1, rows: 1, y: 1, x: 0},
            {cols: 2, rows: 2, y: 3, x: 5, minItemRows: 2, minItemCols: 2, label: 'Min rows & cols = 2'},
            {cols: 2, rows: 2, y: 2, x: 0, maxItemRows: 2, maxItemCols: 2, label: 'Max rows & cols = 2'},
            {cols: 2, rows: 1, y: 2, x: 2, dragEnabled: true, resizeEnabled: true, label: 'Drag&Resize Enabled'},
            {cols: 1, rows: 1, y: 2, x: 4, dragEnabled: false, resizeEnabled: false, label: 'Drag&Resize Disabled'},
            {cols: 1, rows: 1, y: 2, x: 6}
        ];
    }

    timePeriods = [
        'Bronze age',
        'Iron age',
        'Middle ages',
        'Early modern period',
        'Long nineteenth century',
        'azrgvazrg',
        'azrgargaergaergaer',
        'aervargaer'
      ];

    /**
     * 
     * @param event 
     */
    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
    }

    /**
     * 
     */
    changedOptions(): void {
        if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

    /**
     * 
     * @param $event 
     * @param item 
     */
    removeItem($event: MouseEvent | TouchEvent, item): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.dashboard.splice(this.dashboard.indexOf(item), 1);
    }

    /**
     * 
     */
    addItem(): void {
        this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});
    }
}
