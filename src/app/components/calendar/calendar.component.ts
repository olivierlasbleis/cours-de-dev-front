import { Component, HostListener, Input, OnInit
} from '@angular/core';
import HeureDeCoursDto from 'app/models/HeureDeCours';
import JourDeCoursDto from 'app/models/JourDeCours';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormulaireCoursComponent } from './formulaire-cours/formulaire-cours.component';
import { PaymentComponent } from './payment/payment.component';
import { RecapitulatifCommandeComponent } from './recapitulatif-commande/recapitulatif-commande.component';
import CommandeDto from 'app/models/Commande';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JoursDeCoursService } from 'app/services/jours-de-cours.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit{

  public innerWidth: any;


  commande : CommandeDto = { 
                          idPaiementStripe : "",
                          recapitulatifCommandeDto:{
                                  listeHeuresDeCoursDto:[],
                                  listeDescriptionCommandeDto:[],
                                  prix:0
                                },
                          clientDto : {
                                  nom:"",
                                  prenom:"",
                                  numeroTelephone:"",
                                  email:""

                                }
                          };
  
  listeJoursDeCoursSub: Subscription;
  
  listeJoursDeCours: JourDeCoursDto[];

  ngOnInit(){
    this.innerWidth = window.innerWidth;
    this.jourDeCoursService.getListeJoursDeCours().subscribe(liste => {
      this.jourDeCoursService.subSetListeJourDeCoursDto(liste);
      this.listeJoursDeCoursSub = this.jourDeCoursService.subGetListeJourDeCoursDto.subscribe(
        listeJoursDeCours => this.listeJoursDeCours = listeJoursDeCours
      )
    });
  }
  @HostListener('window:resize', ['$event'])

  isDisponible(heureDeCours : HeureDeCoursDto) : boolean{
    
    if(heureDeCours.etat == "DISPONIBLE"){
      return true;
    }else if(heureDeCours.etat == "INDISPONIBLE"){
      this.supprimerSiExiste(heureDeCours);
      return false;
    }
  }

  isSelected(heureDeCours : HeureDeCoursDto) : boolean{
    for (let index = 0; index < this.commande.recapitulatifCommandeDto.listeHeuresDeCoursDto.length; index++) {
      const hDeCours = this.commande.recapitulatifCommandeDto.listeHeuresDeCoursDto[index];
      if(JSON.stringify(hDeCours) === JSON.stringify(heureDeCours)){
        return true;
      }
    }
    return false;
  }
matExpansionIsOpen():boolean{
  if (window.innerWidth>992) {
    return true;
  }else{
    return false;
  }
}

  ngOnDestroy() {
    this.listeJoursDeCoursSub.unsubscribe();
  }

  autre(){
    this.jourDeCoursService.getListeJoursDeCours().subscribe(liste => {
      this.jourDeCoursService.subSetListeJourDeCoursDto(liste);
      
    });
  }

  constructor(
    public modalService: NgbModal,
    public jourDeCoursService : JoursDeCoursService) {}

  selectionner(heureDeCours : HeureDeCoursDto){
    if (!this.supprimerSiExiste(heureDeCours) && this.isDisponible(heureDeCours)) {
      this.commande.recapitulatifCommandeDto.listeHeuresDeCoursDto.push(heureDeCours);
      this.commande.recapitulatifCommandeDto.listeDescriptionCommandeDto.push(`le ${heureDeCours.dateJour} à partir de ${heureDeCours.dateHeure}`);
      this.commande.recapitulatifCommandeDto.prix = this.commande.recapitulatifCommandeDto.prix + heureDeCours.prix;
        
    }
  }

  supprimerSiExiste(heureDeCours : HeureDeCoursDto) : boolean {
    for (let index = 0; index < this.commande.recapitulatifCommandeDto.listeHeuresDeCoursDto.length; index++) {
      const hDeCours = this.commande.recapitulatifCommandeDto.listeHeuresDeCoursDto[index];
      let memoireEtat : string = hDeCours.etat;
      hDeCours.etat = 'INDISPONIBLE';
      if(JSON.stringify(hDeCours) === JSON.stringify(heureDeCours)){
        this.commande.recapitulatifCommandeDto.listeHeuresDeCoursDto.splice(index,1);
        this.commande.recapitulatifCommandeDto.listeDescriptionCommandeDto.splice(index,1);
        this.commande.recapitulatifCommandeDto.prix = this.commande.recapitulatifCommandeDto.prix - heureDeCours.prix;
        
        return true;
      }
      hDeCours.etat = memoireEtat;
    }
    return false;
  }

  ouvrirModal(commande : CommandeDto) {

      for (let j = 0; j < this.listeJoursDeCours.length; j++) {
        const jDeCours = this.listeJoursDeCours[j];
        for (let k = 0; k < jDeCours.listeHeureDeCoursDto.length; k++) {
          const hDeCoursJour = jDeCours.listeHeureDeCoursDto[k];
          if (hDeCoursJour.etat == 'INDISPONIBLE') {
            this.supprimerSiExiste(hDeCoursJour);
          }
        }
        
      }
      
    
    const modalRef = this.modalService.open(RecapitulatifCommandeComponent);
    modalRef.componentInstance.commande = commande;
    modalRef.result.then((result) => {
    }, (reason) => {
      console.log(reason)
    });
  }

  validerEtPayer(): void {
    this.ouvrirModal(this.commande )
  }

  
  
}
