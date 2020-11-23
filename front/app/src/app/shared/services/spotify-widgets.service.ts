import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyWidgetsService {

    constructor(private http: HttpClient) { }

    options;

    getProfile(uid) {
      console.log(uid);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: uid
        })
      
      };
      return this.http.get<any>('http://localhost:8080/spotify/getprofile', httpOptions);
    }
}
