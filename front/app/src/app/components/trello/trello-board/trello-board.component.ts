import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import firebase from 'firebase';
require('firebase/auth');

@Component({
    selector: 'app-trello-board',
    templateUrl: './trello-board.component.html',
    styleUrls: ['./trello-board.component.css']
})

export class TrelloBoardComponent implements OnInit {
    data: any;
    uid: string;
    subscription: Subscription;

    constructor(private _httpClient: HttpClient) { }

    ngOnInit(): void {
        this.fetchBoard();
    }

    ngOnDestroy () {
        if (this.subscription != undefined)
            this.subscription.unsubscribe();
    }

    /**
     * 
     */
    fetchBoard () {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid;

                const httpOptions = {
                    headers: new HttpHeaders({
                      'Content-Type':  'application/json',
                      'Authorization': this.uid,
                    })
                };

                this.subscription = this._httpClient.get<any>('http://localhost:8080/trello/myboards', httpOptions).subscribe(result => {
                    this.data = result;

                    console.log(result);
                })
            }
        });
    }
}