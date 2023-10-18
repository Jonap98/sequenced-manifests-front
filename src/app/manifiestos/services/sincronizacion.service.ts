import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SincronizacionService {

  private urlBase = environments.urlBase;

  constructor(
    private http: HttpClient
  ) { }

  syncBySerial( brazo: string, tramo: string, ubicacion: string, num_serie: string ): Observable<any> {
    const data = {
      brazo,
      tramo,
      ubicacion,
      num_serie
    };

    const resp = this.http.post(`${this.urlBase}/sincronizar/by-serial`, data);
    return resp;
  }

  syncByDifferenece( brazo: string, tramo: string, ubicacion: string, diferencia: string ): Observable<any> {
    const data = {
      brazo,
      tramo,
      ubicacion,
      diferencia
    };

    const resp = this.http.post(`${this.urlBase}/sincronizar/by-difference`, data);
    return resp;
  }

}
