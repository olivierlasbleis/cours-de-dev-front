import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CommandeDto from 'app/models/Commande';
import { JoursDeCoursService } from 'app/services/jours-de-cours.service';
import { PaymentService } from 'app/services/payment.service';
import { ToastrService } from 'ngx-toastr';
import { MessageFinalComponent } from '../message-final/message-final.component';

@Component({
  selector: 'app-confirmation-paiement',
  templateUrl: './confirmation-paiement.component.html',
  styleUrls: ['./confirmation-paiement.component.css']
})
export class ConfirmationPaiementComponent implements OnInit, OnDestroy {

  @Input() id;
  @Input() nom;
  @Input() description;
  @Input() prix;
  @Input() commande : CommandeDto;

  constructor(
    public jourDeCoursService : JoursDeCoursService,
    public activeModal: NgbActiveModal,
    private paymentService: PaymentService,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
    console.log(this.commande)
  }

  ngOnDestroy() {
    console.log(this.commande)
  }

  confirmar(id: string): void {
    this.paymentService.confirmer(id, this.commande).subscribe(
      data => {
        this.openMessage('Confirmation',
        'le paiement a été confirmé ',
         'identifiant' + data[`id`]);
         this.jourDeCoursService.getListeJoursDeCours().subscribe(liste => {
          this.jourDeCoursService.subSetListeJourDeCoursDto(liste);
          
        });
        this.activeModal.close();
      },
      err => {
        console.log(err);
        this.activeModal.close();
      }
    );
  }

  cancelar(id: string): void {
    this.paymentService.annuler(id).subscribe(
      data => {
        this.openMessage('Annulation',
          'le paiement a été annulé',
          'identifiant' + data['id'])
          this.activeModal.close();
      },
      err => {
        console.log(err);
        this.activeModal.close();
      }
    );
  }

  openMessage(message : string, header : string, footer : string){
      const modalRef = this.modalService.open(MessageFinalComponent);
      modalRef.componentInstance.message = message;
      modalRef.componentInstance.header = header;
      modalRef.componentInstance.footer = footer;
  }
}
