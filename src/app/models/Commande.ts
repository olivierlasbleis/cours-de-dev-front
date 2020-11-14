import RecapitulatifCommandeDto from './RecapitulatifCommandeDto'
import ClientDto from './ClientDto'

export default interface CommandeDto {

    
    recapitulatifCommandeDto : RecapitulatifCommandeDto;
    clientDto : ClientDto;
    idPaiementStripe : string;
}