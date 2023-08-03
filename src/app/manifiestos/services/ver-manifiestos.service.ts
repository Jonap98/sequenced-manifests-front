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

  getManifiestos( brazo: string, seccion: string ): Observable<any> {
    const resp = this.http.get(`${this.urlBase}/get-lecturas/${brazo}/${seccion}`);
    // console.log('resp')
    // console.log(resp)
    return resp;
  }
}
