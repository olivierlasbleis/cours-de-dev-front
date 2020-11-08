import HeureDeCoursDto from './HeureDeCours'

export default interface RecapitulatifCommandeDto {

    
    listeHeuresDeCoursDto : HeureDeCoursDto[];
    listeDescriptionCommandeDto : string[];
    prix:number;

}