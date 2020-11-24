import { Component, OnInit, Input } from '@angular/core';
import { TwitterWidgetsService } from '../../../shared/services/twitter-widgets.service';
import { SaveWidgetsService } from '../../../shared/services/save-widgets.service';

@Component({
  selector: 'app-twitter-search',
  templateUrl: './twitter-search.component.html',
  styleUrls: ['./twitter-search.component.css']
})
export class TwitterSearchComponent implements OnInit {
    @Input() param: string;
    @Input() widget_id: string;
    input: string;
    search: boolean;
    userSearch;
    obj: any;
    output: JSON;
        
    constructor(public twitterService: TwitterWidgetsService, public saveWidgets: SaveWidgetsService) {
    }

    ngOnInit(): void {
        if (this.param == null) {
            this.search = true;
        } else {
            this.search = false;
            const message = {
                'search' : this.param,
            };
            this.twitterService.postSearch(JSON.parse(localStorage.getItem('user')).uid, message).subscribe(response => {
                console.log(response);
                this.userSearch = response;
            });
        }
    }

    postSearch() {
        const message = {
            'search' : this.input,
        };
        this.twitterService.postSearch(JSON.parse(localStorage.getItem('user')).uid, message).subscribe(response => {
            console.log(response);
            this.userSearch = response;
        });
        this.param = this.input;
        this.obj = {
            'uid' : JSON.parse(localStorage.getItem('user')).uid,
            'position' : [1, 1],
            'params' : {'search' : this.input},
            'service' : 'TWITTER',
            'type' : 'SEARCH',
            'id_widget' : this.widget_id,
            };
            this.output = <JSON>this.obj;
            console.log(this.output)
            this.saveWidgets.updateData(this.output, JSON.parse(localStorage.getItem('user')).uid, this.widget_id);
            this.search = false;
    }

}
