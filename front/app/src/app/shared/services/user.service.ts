
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UserService {

    constructor(private _httpClient: HttpClient) { }

    createOrUpdate (data) {
        this._httpClient.post<any>('http://localhost:8080/api/user/', data).subscribe(response => {}, error => {
            console.log('ERROR: ', error);
        })
    }
}
