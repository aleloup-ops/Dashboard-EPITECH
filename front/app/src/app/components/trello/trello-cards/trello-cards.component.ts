import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import firebase from 'firebase';
require('firebase/auth');

@Component({
    selector: 'app-trello-cards',
    templateUrl: './trello-cards.component.html',
    styleUrls: ['./trello-cards.component.css']
})

export class TrelloCardsComponent implements OnInit {
    data: any;
    uid: string;
    subscription: Subscription;

    constructor(private _httpClient: HttpClient) {}

    ngOnInit(): void {
        this.fetchCards();
    }

    ngOnDestroy () {
        if (this.subscription != undefined)
            this.subscription.unsubscribe();
    }

    /**
     * 
     */
    fetchCards () {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.uid = user.uid;

                const httpOptions = {
                    headers: new HttpHeaders({
                      'Content-Type':  'application/json',
                      'Authorization': this.uid,
                    })
                };

                const board = "5fa285b3a03eb66f820cf28b";

                this.subscription = this._httpClient.post<any>('http://localhost:8080/trello/getcards', {'board': board }, httpOptions).subscribe(result => {
                    this.data = result;

                    console.log(result);
                })
            }
        })
    }
}
