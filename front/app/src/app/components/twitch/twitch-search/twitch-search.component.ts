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
        if (this.subscription != undefined)
            this.subscription.unsubscribe();
    }

    fetchSearch (search: string) {
        const uid = JSON.parse(localStorage.getItem('user')).uid

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': uid
            })
        };

        this.subscription = this._httpClient.post<any>('http://localhost:8080/twitch/search', { 'channel': search }, httpOptions).subscribe(result => {
            console.log(result);
        })
    }
}
