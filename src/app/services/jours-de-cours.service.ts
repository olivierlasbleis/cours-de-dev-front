import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import JourDeCoursDto from 'app/models/JourDeCours';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

const URL_BACKEND=environment.backendUrl;

@Injectable({
  providedIn: 'root'
})
export class JoursDeCoursService {

  /**
   * BehaviorSubjet dans lequel "passe" le favori selectionné
   */
  private _subListeJourDeCoursDto = new BehaviorSubject<JourDeCoursDto[]>(undefined);



  /**
   * getter qui permet de récupérer le contenu du subject
   * @type Observable<Favori>
   */
  get subGetListeJourDeCoursDto(): Observable<JourDeCoursDto[]> {
    return this._subListeJourDeCoursDto.asObservable();
  }

  /** Méthode pour passer dans le subject un favori
   *
   * @param Favori le favori a passer dans le subject
   */
  subSetListeJourDeCoursDto = (listeJourDeCoursDto: JourDeCoursDto[]) =>{
    this._subListeJourDeCoursDto.next(listeJourDeCoursDto);
  }

  constructor(private http:HttpClient) { }

  getListeJoursDeCours():Observable<JourDeCoursDto[]>{
    return this.http.get<JourDeCoursDto[]>(`${URL_BACKEND}/jourDeCours/next`);
  }
}
