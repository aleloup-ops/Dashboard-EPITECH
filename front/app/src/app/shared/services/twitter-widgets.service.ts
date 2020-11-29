import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwitterWidgetsService {

    constructor(private http: HttpClient) { }

    getTimeline(uid) {
        console.log(uid);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                Authorization: uid
            })
        
        };
        return this.http.get<any>('http://localhost:8080/twitter/mytimeline', httpOptions);
    }

    postTweet(uid, message) {
        console.log(message.text);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                Authorization: uid
            })
        
        };
        this.http.post<any>('http://localhost:8080/twitter/post', message, httpOptions).subscribe(response => {}, error => {
            console.log('ERROR: ', error);
        });
    }

    postSearch(uid, research) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                Authorization: uid
            })
        
        };
        return this.http.post<any>('http://localhost:8080/twitter/search', research, httpOptions);
    }
}
