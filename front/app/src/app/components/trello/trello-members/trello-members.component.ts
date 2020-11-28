import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import firebase from 'firebase';
require('firebase/auth');

@Component({
    selector: 'app-trello-members',
    templateUrl: './trello-members.component.html',
    styleUrls: ['./trello-members.component.css']
})

export class TrelloMembersComponent implements OnInit {
    data: any;
    uid: string;
    subscription: Subscription;

    constructor(private _httpClient: HttpClient) { }

    ngOnInit(): void {
        this.fetchMembers();
    }

    ngOnDestroy () {
        if (this.subscription != undefined)
            this.subscription.unsubscribe();
    }

    fetchMembers () {
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

                this.subscription = this._httpClient.post<any>('http://localhost:8080/trello/getmembers', {'board': board }, httpOptions).subscribe(result => {
                    this.data = result;

                    console.log(result);
                })
            }
        })
    }

}
