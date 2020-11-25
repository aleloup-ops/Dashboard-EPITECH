import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloCardsComponent } from './trello-cards.component';

describe('TrelloCardsComponent', () => {
  let component: TrelloCardsComponent;
  let fixture: ComponentFixture<TrelloCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrelloCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrelloCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
