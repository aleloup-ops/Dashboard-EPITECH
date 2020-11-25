import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloBaseComponent } from './trello-base.component';

describe('TrelloBaseComponent', () => {
  let component: TrelloBaseComponent;
  let fixture: ComponentFixture<TrelloBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrelloBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrelloBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
