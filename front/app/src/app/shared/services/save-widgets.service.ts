import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SaveWidgetsService {

    constructor(private http: HttpClient) { }

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
    updateData(data) {
        this.http.get<any>('http://localhost:8080/api/widget/').subscribe(response => {}, error => {
        console.log('ERROR: ', error);
        });    
    }

    ngOnInit() {

    }
}
