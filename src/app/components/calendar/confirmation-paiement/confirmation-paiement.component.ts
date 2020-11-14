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

  paiementEnCours : boolean = false;

  constructor(
    public jourDeCoursService : JoursDeCoursService,
    public activeModal: NgbActiveModal,
    private paymentService: PaymentService,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  confirmar(id: string): void {
    this.paiementEnCours = true;
    this.commande.idPaiementStripe = id;
    this.paymentService.confirmer(id, this.commande).subscribe(
      data => {
        this.openMessage('Confirmation du paiement',
        'Merci pour votre commande !', 
        'Vous devriez recevoir d\'ici quelques secondes un mail récapitulatif, ' +
        'à bientôt en cours !');
         this.jourDeCoursService.getListeJoursDeCours().subscribe(liste => {
          this.jourDeCoursService.subSetListeJourDeCoursDto(liste);
          this.paiementEnCours = false;
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
          'Le paiement a été annulé',
          'Pas de soucis, prenez votre temps pour choisir le bon horaire. ' +
          'N\'hésitez pas à me contacter au 06 99 89 42 22 ou sur lasbleis.olivier@yahoo.fr si vous avez des questions.' +
          ' -- identifiant du paiement annulé : ' + data['id'] + ' -- ')
          this.paiementEnCours = false;
          this.activeModal.close();
      },
      err => {
        console.log(err);
        this.paiementEnCours = false;
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
