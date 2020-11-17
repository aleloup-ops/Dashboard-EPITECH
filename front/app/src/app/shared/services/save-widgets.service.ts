import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaveWidgetsService {

  constructor(private http: HttpClient) { }

  saveData(data) {
      this.http.post<any>('http://localhost:8080/api/widget/', data).subscribe(response => {}, error => {
        console.log('ERROR: ', error);
    });
  }

  test

  getData() {
    this.http.get<any>('http://localhost:8080/api/widget/').subscribe(response => {
      this.test = response;
      console.log(this.test);
    });
    return this.test
  }

  updateData(data) {
    this.http.get<any>('http://localhost:8080/api/widget/').subscribe(response => {}, error => {
      console.log('ERROR: ', error);
    });    
  }
}
