import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-twitch-follows',
  templateUrl: './twitch-follows.component.html',
  styleUrls: ['./twitch-follows.component.css']
})

export class TwitchFollowsComponent implements OnInit {
    data: any;
    subscription: Subscription;

    constructor(private _httpClient: HttpClient) {
        this.subscription = this.fetchFollowers().subscribe(resultat => {
            this.data = resultat;

            console.log(this.data);            
        })
    }

    ngOnInit (): void { }

    ngOnDestroy () {
        this.subscription.unsubscribe();
    }

    /**
     * 
     */
    fetchFollowers () {
        const uid = JSON.parse(localStorage.getItem('user')).uid

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': uid
            })
        };

        return this._httpClient.get<any>('http://localhost:8080/twitch/getfollowers', httpOptions);
    }
}