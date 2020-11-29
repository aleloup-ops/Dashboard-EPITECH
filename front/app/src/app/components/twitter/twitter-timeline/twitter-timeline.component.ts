import { Component, OnInit } from '@angular/core';
import { TwitterWidgetsService } from '../../../shared/services/twitter-widgets.service';

@Component({
  selector: 'app-twitter-timeline',
  templateUrl: './twitter-timeline.component.html',
  styleUrls: ['./twitter-timeline.component.css']
})
export class TwitterTimelineComponent implements OnInit {

  constructor(public twitterService: TwitterWidgetsService) {
    this.twitterService.getTimeline(JSON.parse(localStorage.getItem('user')).uid).subscribe(response => {
        console.log(response);
        this.userTimeline = response;
    })
  }

  userTimeline;

  ngOnInit(): void {

  }

}
