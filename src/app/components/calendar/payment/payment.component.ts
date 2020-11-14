import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CommandeDto from 'app/models/Commande';
import { PaymentIntentDto } from 'app/models/payment-intent-dto';
import { PaymentService } from 'app/services/payment.service';

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { ConfirmationPaiementComponent } from '../confirmation-paiement/confirmation-paiement.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor( 
    public activeModal: NgbActiveModal,
    private stripeService : StripeService,
    public paymentService : PaymentService,
    private router: Router,
    public modalService: NgbModal) {}

  @Input() commande : CommandeDto;
    elements: Elements;
    card: StripeElement;
    error :  any;
    elementsOptions: ElementsOptions = {
      locale: 'fr'
    };
    paiementEnCours : boolean = false;
  ngOnInit(): void {
    this.stripeService.elements(this.elementsOptions)
      .subscribe(elements => {
        this.elements = elements;
        // Only mount the element the first time
        if (!this.card) {
          this.card = this.elements.create('card', {
            style: {
              base: {
                iconColor: '#666EE8',
                color: '#31325F',
                lineHeight: '40px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '18px',
                '::placeholder': {
                  color: '#CFD7E0'
                }
              }
            }
          });
          this.card.mount('#card-element');
        }
      });
  }

  public stripeForm = new FormGroup({
    nomTitulaireCarte: new FormControl('', Validators.required)
  });

  buy() {
    const name = this.stripeForm.get('nomTitulaireCarte').value;
    this.paiementEnCours=true;
    this.stripeService
      .createToken(this.card, { name })
      .subscribe(result => {
        if (result.token) {
          const paymentIntentDto: PaymentIntentDto = {
            token: result.token.id,
            amount: this.commande.recapitulatifCommandeDto.prix,
            currency: 'eur',
            description: "cours-de-dev.fr"
          };
          this.paymentService.pagar(paymentIntentDto).subscribe(
            data => {
              this.ouvrirModalConfirmationPaiement(data[`id`], "cours-de-dev.fr", data[`description`], data[`amount`]);
              this.router.navigate(['/']);
              this.paiementEnCours=false;
            }
          );
          this.error = undefined;
        } else if (result.error) {
          this.error = result.error.message;
        }
      });
      
  }

  ouvrirModalConfirmationPaiement(id: string, nom: string, description: string, prix: number) {
    const modalRef = this.modalService.open(ConfirmationPaiementComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.nom = nom;
    modalRef.componentInstance.description = description;
    modalRef.componentInstance.prix = this.commande.recapitulatifCommandeDto.prix;
    modalRef.componentInstance.commande = this.commande;
    this.activeModal.close();
  }
  
}
