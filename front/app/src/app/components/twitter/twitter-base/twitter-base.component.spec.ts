import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterBaseComponent } from './twitter-base.component';

describe('TwitterBaseComponent', () => {
  let component: TwitterBaseComponent;
  let fixture: ComponentFixture<TwitterBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
