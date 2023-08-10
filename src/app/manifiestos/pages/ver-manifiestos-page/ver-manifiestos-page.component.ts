import { Component, Input, OnInit } from '@angular/core';
import { VerManifiestosService } from '../../services/ver-manifiestos.service';
import { Router } from '@angular/router';
import { Manifiesto } from '../../interfaces/manifiestos';
import { Observable, find } from 'rxjs';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-ver-manifiestos-page',
  templateUrl: './ver-manifiestos-page.component.html',
  styleUrls: ['./ver-manifiestos-page.component.css']
})
export class VerManifiestosPageComponent implements OnInit {

  public manifiestosList? : Manifiesto[];

  constructor(
    private router: Router,
    private manifiestosService: VerManifiestosService,
  ) {
    this.seccion = localStorage.getItem('seccion') ?? '';
    this.brazo = localStorage.getItem('brazo') ?? '';
    this.initialPosition = localStorage.getItem('diferencia') ?? '0';

    if( this.initialPosition == '0' ) {
      this.actualizar();
      } else {
      this.sincronizar();
    }
  }

  @Input()
  public listaDeIds: any[] = [];

  public seccion = '';
  public brazo = '';
  public ubicacion = '';
  public initialPosition = '';

  public imagen = 'http://10.40.129.40:99/tkav/storage/';


  public interval?: any;

  public isActive: boolean = false;

  public id?: any;

  initModalContent() {
    this.isActive = true;
  }

  removeModalContent() {
    this.isActive = false;
  }

  public timmers?: any[];
  public lista: any[] = [];

  public diferencia: number = 0;

  ngOnInit(): void {
    this.id = null;

    this.id = setInterval(() => {
      if( this.router.url == '/manifiestos/manifiestos' ) {
        this.numero_de_serie = localStorage.getItem('num_serie') ?? '';
        if( this.numero_de_serie == '' ) {
          this.actualizar();
        } else {
          this.sincronizar();
        }
      }
    }, 5000);

    this.initialPosition = localStorage.getItem('diferencia') ?? '0';
    this.numero_de_serie = localStorage.getItem('num_serie') ?? '';

    if( this.initialPosition == '0' ) {
      this.actualizar();
      } else {
      this.sincronizar();
    }

    this.listaDeIds.push(this.id);

    this.seccion = localStorage.getItem('seccion') ?? '';
    this.brazo = localStorage.getItem('brazo') ?? '';
    this.ubicacion = localStorage.getItem('ubicacion') ?? '';

  }

  regresar() {
    this.router.navigate(['manifiestos/seleccion']);
  }

  public numero_de_serie = '';
  actualizar() {
    this.manifiestosService.getManifiestos(
      localStorage.getItem('brazo') ?? '',
      localStorage.getItem('seccion') ?? '',
      localStorage.getItem('ubicacion') ?? '',
      // this.numero_de_serie
    )
      .subscribe( ({data})  => {
        this.manifiestosList = data;
        this.manifiestosList!.reverse()
      });
  }

  syncData( num_serie: string ): void {
    // 1- Establecer en local storage el número de serie
    localStorage.setItem('num_serie', `${num_serie} `);
    // 2- Obtener la diferencia del número de serie
    // const elemento = this.manifiestosList!.findIndex((element) => element.NumSerie == `${num_serie} `);
    const elemento = this.manifiestosList!.findIndex( (element) => element.NumSerie.indexOf(num_serie) > -1 );
    this.diferencia = this.manifiestosList!.length - elemento;
    // 3- Establecer en local storage la diferencia
    localStorage.setItem('diferencia', this.diferencia.toString());
    // 4- Sincronizar
    this.sincronizar();
  }

  public ultimoNumero = 0;
  sincronizar() {

    let lista = [];
    // Se obtienen los escaneos tal cual, sin filtro, para obtener la posición del número de serie
    this.manifiestosService.getManifiestos(
      localStorage.getItem('brazo') ?? '',
      localStorage.getItem('seccion') ?? '',
      localStorage.getItem('ubicacion') ?? '',
    )
      .subscribe( ({data})  => {

        this.manifiestosService.getManifiestosByNumSerie(
          localStorage.getItem('brazo') ?? '',
          localStorage.getItem('seccion') ?? '',
          localStorage.getItem('ubicacion') ?? '',
          Number(localStorage.getItem('diferencia') ?? ''),
        )
          .subscribe( ({data})  => {
            this.manifiestosList = data;
            this.manifiestosList!.reverse()
          });
      });
  }
}
