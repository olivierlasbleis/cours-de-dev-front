import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFinalComponent } from './message-final.component';

describe('MessageFinalComponent', () => {
  let component: MessageFinalComponent;
  let fixture: ComponentFixture<MessageFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
