import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyBaseComponent } from './spotify-base.component';

describe('SpotifyBaseComponent', () => {
  let component: SpotifyBaseComponent;
  let fixture: ComponentFixture<SpotifyBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifyBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
