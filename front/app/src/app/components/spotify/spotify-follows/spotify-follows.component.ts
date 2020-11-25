import { Component, OnInit } from '@angular/core';
import { SpotifyWidgetsService } from '../../../shared/services/spotify-widgets.service';

@Component({
  selector: 'app-spotify-follows',
  templateUrl: './spotify-follows.component.html',
  styleUrls: ['./spotify-follows.component.css']
})
export class SpotifyFollowsComponent implements OnInit {

    input: string = "";

  constructor(public spotifyService: SpotifyWidgetsService) {
    this.spotifyService.getTopTracks(JSON.parse(localStorage.getItem('user')).uid).subscribe(response => {
      console.log(response);
      this.userTracks = response.items;
    })
    this.index = 1;
  }

  userTracks;
  index;

  ngOnInit(): void {
  }

}
