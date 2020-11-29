import { Component, OnInit } from '@angular/core';
import { SpotifyWidgetsService } from '../../../shared/services/spotify-widgets.service';

@Component({
  selector: 'app-spotify-profile',
  templateUrl: './spotify-profile.component.html',
  styleUrls: ['./spotify-profile.component.css']
})
export class SpotifyProfileComponent implements OnInit {

    constructor(public spotifyService: SpotifyWidgetsService) {
      this.userProfile = this.spotifyService.getProfile(JSON.parse(localStorage.getItem('user')).uid).subscribe(response => {
        this.userProfile = response;
        this.spotifyLink = response.external_urls.spotify;
        this.userFollowers = response.followers.total;
        this.userAvatar = response.images[0].url;
        console.log(this.userProfile);
      })
    }

    userProfile;
    spotifyLink;
    userFollowers;
    userAvatar;

    ngOnInit(): void {
    }

}
