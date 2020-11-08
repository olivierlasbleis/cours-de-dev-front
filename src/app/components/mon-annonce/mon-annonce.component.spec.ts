import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonAnnonceComponent } from './mon-annonce.component';

describe('MonAnnonceComponent', () => {
  let component: MonAnnonceComponent;
  let fixture: ComponentFixture<MonAnnonceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonAnnonceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
