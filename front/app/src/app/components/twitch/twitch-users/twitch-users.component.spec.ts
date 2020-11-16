import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchUsersComponent } from './twitch-users.component';

describe('TwitchUsersComponent', () => {
  let component: TwitchUsersComponent;
  let fixture: ComponentFixture<TwitchUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
