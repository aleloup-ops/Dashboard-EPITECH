import { Component, NgZone, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { Router } from '@angular/router';
import { $ } from 'protractor';
import { AuthService } from '../../shared/services/auth.service';
import { TwitchConnectService } from '../../shared/services/twitch-connect.service';
import { SaveWidgetsService } from '../../shared/services/save-widgets.service'

@Component({
  selector: 'app-widget-creation',
  templateUrl: './widget-creation.component.html',
  styleUrls: ['./widget-creation.component.css']
})

export class WidgetCreationComponent implements OnInit {

    constructor(public twitchService: TwitchConnectService, public authService: AuthService, public save: SaveWidgetsService) { }

    ngOnInit(): void {
        console.log(JSON.parse(localStorage.getItem('user')));
        console.log(JSON.parse(localStorage.getItem('connection')));
    }

    output: JSON;
    obj: any;

    /**
     * 
     * @param service 
     * @param type 
     * @param params 
     */
    saveWidget(service, type, params) {
        this.obj = {
        'uid' : JSON.parse(localStorage.getItem('user')).uid,
        'position' : [1, 1],
        'params' : {'search' : params},
        'service' : service,
        'type' : type,
        'id_widget' : '_' + Math.random().toString(36).substr(2, 9)
        };
        this.output = <JSON>this.obj;
        console.log(this.output)
        this.save.saveData(this.output);
    }

    /**
     * 
     */
    get isConnectedTwitter () {
        let data = JSON.parse(localStorage.getItem('user'));

        for (const elem of data.providerData) {
            if (elem.providerId == "twitter.com")
                return true;
        }

        return false;
    }

    /**
     * 
     */
    get isConnectedTwitch () {
        let data = JSON.parse(localStorage.getItem('connection'));

        if (data === null)
            return false;

        if (data['twitch'] !== undefined && data['twitch'] === true)
            return true;

        return false;
    }

    /**
     * 
     */
    get isConnectedSpotify () {
        let data = JSON.parse(localStorage.getItem('connection'));

        if (data === null)
            return false;

        if (data['spotify'] !== undefined && data['spotify'] === true)
            return true;

        return false;
    }

    /**
     * 
     */
    userUid () {
        let data = JSON.parse(localStorage.getItem('user'));

        return data.uid;
    }

    /**
     * 
     */
    loginTwitch () {
        let url = "http://localhost:8080/twitch/" + this.userUid();
        let data = JSON.parse(localStorage.getItem('connection'));

        if (data === null)
            data = {}

        data['twitch'] = true;
        localStorage.setItem('connection', JSON.stringify(data));

        window.location.href = url
    }

    /**
     * 
     */
    loginSpotify () {
        let url = "http://localhost:8080/spotify/" + this.userUid();
        let data = JSON.parse(localStorage.getItem('connection'));

        if (data === null)
            data = {}

        data['spotify'] = true;
        localStorage.setItem('connection', JSON.stringify(data));

        window.location.href = url
    }
}
