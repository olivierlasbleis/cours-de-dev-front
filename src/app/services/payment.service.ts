import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentIntentDto } from '../models/payment-intent-dto';
import { environment } from 'environments/environment';
import CommandeDto from 'app/models/Commande';
environment
const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Expose-Headers': '*'})};
const urlBackEnd = environment.backendUrl;
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  

  constructor(private httpClient: HttpClient) {}

  public pagar(paymentIntentDto: PaymentIntentDto): Observable<string> {
    return this.httpClient.post<string>(`${urlBackEnd}/stripe/paymentintent`, paymentIntentDto, cabecera);
  }

  public confirmer(id: string, commande : CommandeDto): Observable<string> {
    return this.httpClient.post<string>(`${urlBackEnd}/stripe/confirm/${id}`, commande, cabecera);
  }

  public annuler(id: string): Observable<string> {
    return this.httpClient.post<string>(`${urlBackEnd}/stripe/cancel/${id}`, {}, cabecera);
  }

}
