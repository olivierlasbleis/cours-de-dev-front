import { Component, Input, OnInit
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


  commande : CommandeDto = { 
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
    this.jourDeCoursService.getListeJoursDeCours().subscribe(liste => {
      this.jourDeCoursService.subSetListeJourDeCoursDto(liste);
      this.listeJoursDeCoursSub = this.jourDeCoursService.subGetListeJourDeCoursDto.subscribe(
        listeJoursDeCours => this.listeJoursDeCours = listeJoursDeCours
      )
    });
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
    if (!this.supprimerSiExiste(heureDeCours)) {
      this.commande.recapitulatifCommandeDto.listeHeuresDeCoursDto.push(heureDeCours);
      this.commande.recapitulatifCommandeDto.listeDescriptionCommandeDto.push(`le ${heureDeCours.dateJour} à partir de ${heureDeCours.dateHeure}`);
      this.commande.recapitulatifCommandeDto.prix = this.commande.recapitulatifCommandeDto.prix + heureDeCours.prix;
        
    }
    console.log(this.commande.recapitulatifCommandeDto.listeHeuresDeCoursDto)
    console.log(this.commande.recapitulatifCommandeDto.listeDescriptionCommandeDto)
  }

  supprimerSiExiste(heureDeCours : HeureDeCoursDto) : boolean {
    for (let index = 0; index < this.commande.recapitulatifCommandeDto.listeHeuresDeCoursDto.length; index++) {
      const hDeCours = this.commande.recapitulatifCommandeDto.listeHeuresDeCoursDto[index];
      if(JSON.stringify(hDeCours) === JSON.stringify(heureDeCours)){
        this.commande.recapitulatifCommandeDto.listeHeuresDeCoursDto.splice(index,1);
        this.commande.recapitulatifCommandeDto.listeDescriptionCommandeDto.splice(index,1);
        this.commande.recapitulatifCommandeDto.prix = this.commande.recapitulatifCommandeDto.prix - heureDeCours.prix;
        
        return true;
      }
    }
    return false;
  }

  ouvrirModal(commande : CommandeDto) {
    console.log(this.commande)
    const modalRef = this.modalService.open(RecapitulatifCommandeComponent);
    modalRef.componentInstance.commande = commande;
    modalRef.result.then((result) => {
      
       console.log(1)
       console.log(result)
      
    }, (reason) => {console.log(2)
      console.log(reason)
    });
  }

  validerEtPayer(): void {
    this.ouvrirModal(this.commande )
  }

  
  
}
