import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable} from 'angular-gridster2';

@Injectable({
  providedIn: 'root'
})

export class SaveWidgetsService {

    constructor(private http: HttpClient) { }

    ngOnInit() {
    }

    /**
     * 
     * @param data 
     */
    saveData(data) {
        this.http.post<any>('http://localhost:8080/api/widget/', data).subscribe(response => {}, error => {
            console.log('ERROR: ', error);
        });
    }

    /**
     * 
     * @param uid 
     */
    getData(uid) {
        return this.http.get<any>('http://localhost:8080/api/widget/' + uid)
    }

    /**
     * 
     * @param data 
     */
    updateData(data, uid, widget_id) {
        this.http.post<any>('http://localhost:8080/api/widget/' + uid + '/params/' + widget_id, data).subscribe(response => {}, error => {
            console.log('ERROR: ', error);
        }); 
    }

    deleteWidget(uid, widget_id) {
        this.http.delete<any>('http://localhost:8080/api/widget/' + uid + '/delete/' + widget_id).subscribe(response => {}, error => {
            console.log('ERROR: ', error);
        });    
    }
}
