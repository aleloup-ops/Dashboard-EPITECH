import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
    selector: 'app-trello-board',
    templateUrl: './trello-board.component.html',
    styleUrls: ['./trello-board.component.css']
})

export class TrelloBoardComponent implements OnInit {
    data: any;
    subscription: Subscription;

    constructor(private _httpClient: HttpClient) {
        this.subscription = this.fetchBoard().subscribe(result => {
            this.data = result;

            console.log(result);            
        })
    }

    ngOnInit(): void { }

    ngOnDestroy () {
        this.subscription.unsubscribe();
    }

    /**
     * 
     */
    fetchBoard () {
        const uid = JSON.parse(localStorage.getItem('user')).uid

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': uid
            })
        };

        return this._httpClient.get<any>('http://localhost:8080/trello/myboards', httpOptions);
    }
}
