import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchFollowsComponent } from './twitch-follows.component';

describe('TwitchFollowsComponent', () => {
  let component: TwitchFollowsComponent;
  let fixture: ComponentFixture<TwitchFollowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchFollowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchFollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
