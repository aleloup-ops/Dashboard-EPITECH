import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TwitchConnectService {

  totalAngularPackages;

  options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }

  constructor(private http: HttpClient) { }

    test
  
  twitchRequest() {
      // Simple GET request with response type <any>
      this.http.post<any>('http://localhost:8080/api/', 'TWITCH_CONNECT').subscribe(response => {}, error => {
        console.log('ERROR: ', error);
    });
  }

  spotifyRequest() {
      // Simple GET request with response type <any>
      this.http.post<any>('http://localhost:8080/api/', 'SPOTIFY_CONNECT').subscribe(response => {}, error => {
        console.log('ERROR: ', error);
    })
  }
}
