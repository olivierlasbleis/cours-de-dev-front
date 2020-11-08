import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPaiementComponent } from './confirmation-paiement.component';

describe('ConfirmationPaiementComponent', () => {
  let component: ConfirmationPaiementComponent;
  let fixture: ComponentFixture<ConfirmationPaiementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationPaiementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
