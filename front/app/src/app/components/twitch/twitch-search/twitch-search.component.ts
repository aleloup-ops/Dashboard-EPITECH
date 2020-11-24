import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-twitch-search',
  templateUrl: './twitch-search.component.html',
  styleUrls: ['./twitch-search.component.css']
})

export class TwitchSearchComponent implements OnInit {
    data: any;
    subscription: Subscription;

    constructor (private _httpClient: HttpClient) { }

    ngOnInit(): void { }

    ngOnDestroy () {
        this.subscription.unsubscribe();
    }

    fetchSearch (search: string) {
        /*const uid = JSON.parse(localStorage.getItem('user')).uid

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': uid
            })
        };

        return this._httpClient.post<any>('http://localhost:8080/twitch/getfollowers', { 'aza': 'azaza' }, httpOptions);*/

        console.log(search);
    }
}
