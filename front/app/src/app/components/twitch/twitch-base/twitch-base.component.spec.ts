import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchBaseComponent } from './twitch-base.component';

describe('TwitchBaseComponent', () => {
  let component: TwitchBaseComponent;
  let fixture: ComponentFixture<TwitchBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
