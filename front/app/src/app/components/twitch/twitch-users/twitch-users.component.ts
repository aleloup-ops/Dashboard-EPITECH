import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Component({
  selector: 'app-twitch-users',
  templateUrl: './twitch-users.component.html',
  styleUrls: ['./twitch-users.component.css']
})

export class TwitchUsersComponent implements OnInit {
    data: any;
    subscription: Subscription;

    constructor(private _httpClient: HttpClient) {
        this.subscription = this.fetchProfile().subscribe(res => {
            this.data = res; 
            console.log(this.data.data[0]);
        });
    }

    ngOnInit(): void { }

    ngOnDestroy () {
        this.subscription.unsubscribe();
    }

    /**
     * 
     */
    fetchProfile () {
        const uid = JSON.parse(localStorage.getItem('user')).uid

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': uid
            })
        };

        return this._httpClient.get<any>('http://localhost:8080/twitch/getprofile', httpOptions);
    }
}
