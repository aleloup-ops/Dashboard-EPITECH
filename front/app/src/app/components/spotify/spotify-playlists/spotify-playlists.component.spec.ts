import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPlaylistsComponent } from './spotify-playlists.component';

describe('SpotifyPlaylistsComponent', () => {
  let component: SpotifyPlaylistsComponent;
  let fixture: ComponentFixture<SpotifyPlaylistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyPlaylistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
