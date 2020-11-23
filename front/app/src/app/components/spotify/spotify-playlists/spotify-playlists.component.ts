import { Component, OnInit } from '@angular/core';
import { SpotifyWidgetsService } from '../../../shared/services/spotify-widgets.service';

@Component({
  selector: 'app-spotify-playlists',
  templateUrl: './spotify-playlists.component.html',
  styleUrls: ['./spotify-playlists.component.css']
})
export class SpotifyPlaylistsComponent implements OnInit {

  constructor(public spotifyService: SpotifyWidgetsService) {
    this.spotifyService.getPlaylists(JSON.parse(localStorage.getItem('user')).uid).subscribe(response => {
      console.log(response);
      this.userPlaylists = response.items;
    })
  }

  userPlaylists;
  spotifyLink;
  userFollowers;
  userAvatar;

  ngOnInit(): void {
  }

}