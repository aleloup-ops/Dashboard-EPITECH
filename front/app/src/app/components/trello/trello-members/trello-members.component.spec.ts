import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloMembersComponent } from './trello-members.component';

describe('TrelloMembersComponent', () => {
  let component: TrelloMembersComponent;
  let fixture: ComponentFixture<TrelloMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrelloMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrelloMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
