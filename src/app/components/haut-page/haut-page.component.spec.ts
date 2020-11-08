import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HautPageComponent } from './haut-page.component';

describe('HautPageComponent', () => {
  let component: HautPageComponent;
  let fixture: ComponentFixture<HautPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HautPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HautPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
