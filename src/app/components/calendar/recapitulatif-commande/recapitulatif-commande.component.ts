import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CommandeDto from 'app/models/Commande';
import { FormulaireCoursComponent } from '../formulaire-cours/formulaire-cours.component';

@Component({
  selector: 'app-recapitulatif-commande',
  templateUrl: './recapitulatif-commande.component.html',
  styleUrls: ['./recapitulatif-commande.component.css']
})
export class RecapitulatifCommandeComponent implements OnInit {

  @Input() commande : CommandeDto;

  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal) { }

  ngOnInit(): void {
  }

  suivant(){
    console.log(this.commande)
    const modalRef = this.modalService.open(FormulaireCoursComponent);
    modalRef.componentInstance.commandeDto = this.commande;
   
    this.activeModal.close('FormulaireCoursComponent');
  }

  annuler(){
    this.activeModal.close('FormulaireCoursComponent');
  }

}
