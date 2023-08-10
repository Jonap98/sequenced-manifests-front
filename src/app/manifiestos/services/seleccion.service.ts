import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeleccionService {

  private urlBase: string = environments.urlBase;

  constructor(
    private http: HttpClient
  ) { }

  getBrazos(): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/get-brazos`);
  }

  getSecciones( brazo: string ): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/get-secciones/${brazo}`);
  }

  getUbicaciones( brazo: string, seccion: string ): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/get-ubicaciones/${brazo}/${seccion}`);
  }

  getManifiestos(): Observable<any> {
    return this.http.get(`${this.urlBase}/get-lecturas`);
  }
}
