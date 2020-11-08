import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import HeureDeCoursDto from 'app/models/HeureDeCours';
import { FormControl, FormGroup, Validators} from '@angular/forms';

import { StripeService, Elements, Element as StripeElement, ElementsOptions } from 'ngx-stripe';
import { PaymentIntentDto } from 'app/models/payment-intent-dto';
import { PaymentService } from 'app/services/payment.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'app/modal/modal.component';
import { Router } from '@angular/router';
import { ConfirmationPaiementComponent } from '../confirmation-paiement/confirmation-paiement.component';
import CommandeDto from 'app/models/Commande';
import { RecapitulatifCommandeComponent } from '../recapitulatif-commande/recapitulatif-commande.component';
import { PaymentComponent } from '../payment/payment.component';


@Component({
  selector: 'app-formulaire-cours',
  templateUrl: './formulaire-cours.component.html',
  styleUrls: ['./formulaire-cours.component.css']
})
export class FormulaireCoursComponent {

  constructor(public modalService: NgbModal,
    public activeModal: NgbActiveModal) {}

    @Input() commandeDto : CommandeDto;

    
  ngOnInit(): void {
    console.log(this.commandeDto)
  }


  suivant(){
    console.log(this.commandeDto)
    const modalRef = this.modalService.open(PaymentComponent);
    modalRef.componentInstance.commande = this.commandeDto;
    this.activeModal.close();
  }

  precedent(){
    const modalRef = this.modalService.open(RecapitulatifCommandeComponent);
    modalRef.componentInstance.commande = this.commandeDto;
    this.activeModal.close();
  }


  public stripeForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    numeroTelephone: new FormControl('', [Validators.required,
                                          Validators.pattern("^[0-9]*$"),
                                          Validators.minLength(10), Validators.maxLength(10)]),
    email: new FormControl('', [Validators.required,
  	                                      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    
  });

  

  
}
