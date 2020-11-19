import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './shared/services/auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from './angular-material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GridsterModule } from 'angular-gridster2';
import { TwitchBaseComponent } from './components/twitch/twitch-base/twitch-base.component';
import { TwitchFollowsComponent } from './components/twitch/twitch-follows/twitch-follows.component';
import { TwitchSearchComponent } from './components/twitch/twitch-search/twitch-search.component';
import { TwitchUsersComponent } from './components/twitch/twitch-users/twitch-users.component';
import { TwitterBaseComponent } from './components/twitter/twitter-base/twitter-base.component';
import { WidgetCreationComponent } from './components/widget-creation/widget-creation.component';
import { TwitterTimelineComponent } from './components/twitter/twitter-timeline/twitter-timeline.component';
import { TwitterProfileComponent } from './components/twitter/twitter-profile/twitter-profile.component';
import { TwitterSearchComponent } from './components/twitter/twitter-search/twitter-search.component';
import { SpotifyProfileComponent } from './components/spotify/spotify-profile/spotify-profile.component';
import { SpotifyPlaylistsComponent } from './components/spotify/spotify-playlists/spotify-playlists.component';
import { SpotifyFollowsComponent } from './components/spotify/spotify-follows/spotify-follows.component';
import { SpotifyBaseComponent } from './components/spotify/spotify-base/spotify-base.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    TwitchBaseComponent,
    TwitchFollowsComponent,
    TwitchSearchComponent,
    TwitchUsersComponent,
    TwitterBaseComponent,
    WidgetCreationComponent,
    TwitterTimelineComponent,
    TwitterProfileComponent,
    TwitterSearchComponent,
    SpotifyProfileComponent,
    SpotifyPlaylistsComponent,
    SpotifyFollowsComponent,
    SpotifyBaseComponent
  ],

  imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebase),
      BrowserAnimationsModule,

      FormsModule,
      ReactiveFormsModule,

      // MATERIAL ANGULAR
      AngularMaterialModule,
      DragDropModule,
      GridsterModule
  ],

  providers: [
      AuthService,
  ],

  bootstrap: [AppComponent],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule { }
