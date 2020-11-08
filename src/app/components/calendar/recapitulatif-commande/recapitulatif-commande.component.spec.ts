import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapitulatifCommandeComponent } from './recapitulatif-commande.component';

describe('RecapitulatifCommandeComponent', () => {
  let component: RecapitulatifCommandeComponent;
  let fixture: ComponentFixture<RecapitulatifCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapitulatifCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapitulatifCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
