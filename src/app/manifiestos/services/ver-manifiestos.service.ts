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

  getManifiestos( brazo: string, seccion: string, ubicacion: string, cantidad: number = 15 ): Observable<any> {
    const resp = this.http.get(`${this.urlBase}/get-lecturas/${brazo}/${seccion}/${ubicacion}/${cantidad}`);
    return resp;
  }

  getManifiestosByNumSerie( brazo: string, seccion: string, ubicacion: string, num_serie: number, cantidad: number = 25 ): Observable<any> {
    const resp = this.http.get(`${this.urlBase}/get-lecturas-serie/${brazo}/${seccion}/${ubicacion}/${num_serie}/${cantidad}`);
    return resp;
  }

  getManifiestosByDifference( brazo: string, seccion: string, ubicacion: string, num_serie: number, cantidad: number = 25 ): Observable<any> {
    const resp = this.http.get(`${this.urlBase}/get-lecturas-difference/${brazo}/${seccion}/${ubicacion}/${cantidad}`);
    return resp
  }
}
