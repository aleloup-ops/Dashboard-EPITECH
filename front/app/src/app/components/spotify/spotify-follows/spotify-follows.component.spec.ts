import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyFollowsComponent } from './spotify-follows.component';

describe('SpotifyFollowsComponent', () => {
  let component: SpotifyFollowsComponent;
  let fixture: ComponentFixture<SpotifyFollowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyFollowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyFollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
