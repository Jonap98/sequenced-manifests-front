import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Manifiesto } from '../interfaces/manifiestos';

@Injectable({
  providedIn: 'root'
})
export class VerManifiestosService {

  private urlBase = environments.urlBase;

  constructor(
    private http: HttpClient
  ) { }

  getManifiestos( brazo: string, seccion: string, ubicacion: string ): Observable<any> {
    const resp = this.http.get(`${this.urlBase}/get-lecturas/${brazo}/${seccion}/${ubicacion}`);
    return resp;
  }

  getManifiestosByNumSerie( brazo: string, seccion: string, ubicacion: string, num_serie: number ): Observable<any> {
    // console.log('Service')
    // console.log(brazo)
    // console.log(seccion)
    // console.log(num_serie)
    // console.log(num_serie)
    const resp = this.http.get(`${this.urlBase}/get-lecturas-serie/${brazo}/${seccion}/${ubicacion}/${num_serie}`);
    return resp;
  }
}
