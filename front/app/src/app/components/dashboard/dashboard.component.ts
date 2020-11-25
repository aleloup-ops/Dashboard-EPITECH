import { Component, NgZone, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import firebase from 'firebase';
require('firebase/auth');

import { AuthService } from '../../shared/services/auth.service';
import { SaveWidgetsService } from '../../shared/services/save-widgets.service';
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
    user: JSON;

    constructor(public authService: AuthService, public router: Router, public ngZone: NgZone,
        public save: SaveWidgetsService, private elementRef: ElementRef) { }

    options: Safe;
    dashboard: Array<GridsterItem>;
    gridData;

    showWaiting: boolean = false;

    ngOnInit(): void {

        firebase.auth().onAuthStateChanged(user =>  {
            if (user) {
                this.save.getData(user.uid).subscribe(response => {
                    this.gridData = response.widget;
                })
            }
        });

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
