import { Component, OnInit } from '@angular/core';
import { TwitterWidgetsService } from '../../../shared/services/twitter-widgets.service';

@Component({
  selector: 'app-twitter-profile',
  templateUrl: './twitter-profile.component.html',
  styleUrls: ['./twitter-profile.component.css']
})
export class TwitterProfileComponent implements OnInit {
  constructor(public twitterService: TwitterWidgetsService) {
  }

  userPost;
    input: string;

    postTweets() {
        const message = {
            'text' : this.input,
        };
        this.twitterService.postTweet(JSON.parse(localStorage.getItem('user')).uid, message);
    }

  ngOnInit(): void {
  }

}
