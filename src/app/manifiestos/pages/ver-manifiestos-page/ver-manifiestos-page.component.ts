import { Component, Input, OnInit } from '@angular/core';
import { VerManifiestosService } from '../../services/ver-manifiestos.service';
import { Router } from '@angular/router';
import { Manifiesto } from '../../interfaces/manifiestos';
import { Observable, find } from 'rxjs';
import { WebSocketService } from '../../services/websocket.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Colores } from '../../interfaces/colores.interface';
import { environments } from 'src/environments/environments';
import { SincronizacionService } from '../../services/sincronizacion.service';

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
    private sincronizacionService: SincronizacionService,
    private fb: FormBuilder
  ) {
    this.seccion = localStorage.getItem('seccion') ?? '';
    this.brazo = localStorage.getItem('brazo') ?? '';
    this.ubicacion = localStorage.getItem('ubicacion') ?? '0';
    this.initialPosition = localStorage.getItem('diferencia') ?? '0';

    if( this.initialPosition == '0' ) {
      this.actualizar();
      } else {
      this.sincronizar();
    }
  }

  @Input()
  public listaDeIds: any[] = [];

  public bySerial: boolean = false;

  public seccion = '';
  public brazo = '';
  public ubicacion = '';
  public initialPosition = '';

  public imagen = environments.urlImages;

  public interval?: any;

  public isActive: boolean = false;

  public id?: any;

  public modalTitle: string = '';
  public snackbarMessage: string = '';

  public timmers?: any[];
  public lista: any[] = [];

  public diferencia: number = 0;
  public diff = '0';

  public factor?: string;

  public initialQty = 10;

  public qtyForm?: FormGroup;

  // Colores
  public colores: string[] = [
    '#b0401a',
    '#c46a33',
    '#ad900e',
    '#95ba30',
    '#1ab05e',
    '#307a66',
    '#183f45',
    '#1a7cb0',
    '#1a40b0',
    '#2c204d',
    '#6c1ab0',
    '#b01a8b',
    '#a32247',
  ];

  public coloresObj: Colores = {};

  ngOnInit(): void {
    this.id = null;

    this.qtyForm = this.fb.group({
      cantidad: [10]
    });

    this.id = setInterval(() => {
      if( this.router.url == '/manifiestos/manifiestos' ) {

        this.factor = localStorage.getItem('factor') ?? '';
        this.diff = localStorage.getItem('diferencia') ?? '0';

        // Verifica el factor de sincronización para saber si hay que actualizar la info o sincronizarla
        if( this.factor == '' ) {
          // En este punto, ya debe estar sincronizado, por eso valida si hay un número de serie O
          // Diferencia registrados en el local
          this.actualizar();
        } else {
          // En este punto, aún no se ha sincronizado, jalas la información por defecto
          this.sincronizar();
        }
      }
    }, 30000);
    // Actualización cada 30 segundos

    // Agrega a una lista de ids de timmers para limpiarla posterirmente
    this.listaDeIds.push(this.id);

  }

  regresar() {
    this.router.navigate(['manifiestos/seleccion']);
  }

  syncBySerial() {
    this.isActive = true;
    this.bySerial = true;
    this.modalTitle = 'Número de serie';
  }

  syncByDifference() {
    this.isActive = true;
    this.bySerial = false;
    this.modalTitle = 'Diferencia';
  }

  removeModalContent() {
    this.isActive = false;
  }

  public numero_de_serie = '';
  actualizar() {
    this.manifiestosService.getManifiestos(
      localStorage.getItem('brazo') ?? '',
      localStorage.getItem('seccion') ?? '',
      localStorage.getItem('ubicacion') ?? '',
      this.initialQty
    )
      .subscribe( ({data})  => {
        this.manifiestosList = data;
        this.manifiestosList!.forEach(element => {

          let prop = '';
              if( !this.coloresObj.hasOwnProperty( element.modelo ) ) {
                prop = element.modelo;

                this.coloresObj[prop] = this.colores[ Math.floor(( Math.random() * this.colores.length )) ];
              }

              let property = element.modelo

              element.color = this.coloresObj[property]
        });
        this.manifiestosList!.reverse()
      });
  }

  // Sincroniza según el input
  syncData( factor: any ): void {

    // Factor de sincronización: NÚMERO DE SERIE
    if( factor.by_serial == true ) {
      // 1- Establecer en local storage el número de serie y el factor de sincronización
      localStorage.setItem('num_serie', factor.factor_sincronizacion );

      localStorage.setItem('factor', 'num_serie');

      if( !localStorage.getItem('diferencia') ) {

        this.sincronizacionService.syncBySerial(
          localStorage.getItem('brazo') ?? '',
          localStorage.getItem('seccion') ?? '',
          localStorage.getItem('ubicacion') ?? '',
          localStorage.getItem('num_serie') ?? ''
        ).subscribe( resp => {
          localStorage.setItem('diferencia', resp.diferencia)
        } );
      }

    } else {
      // Factor de sincronización: DIFERENCIA
      // 2- Establecer en local storage la diferencia y el factor de sincronización
      localStorage.setItem('diferencia', factor.factor_sincronizacion );

      localStorage.setItem('factor', 'diferencia');

    }

    // 3- Acción de sincronización
    this.sincronizar();
  }

  public success: boolean = false;
  launchSnackbar( message: string ) {
    this.snackbarMessage = message;
    this.success = true;

    setTimeout(() => {
      this.success = false;
    }, 10000);
  }

  sincronizar() {

    // Sincronización por diferencia
    this.sincronizacionService.syncByDifferenece(
      localStorage.getItem('brazo') ?? '',
      localStorage.getItem('seccion') ?? '',
      localStorage.getItem('ubicacion') ?? '',
      localStorage.getItem('diferencia') ?? '10'
    ).subscribe( resp => {

        this.manifiestosList = resp.data;
        // Establece el color para cada unidad
        this.manifiestosList!.forEach(element => {
          let prop = '';
          if( !this.coloresObj.hasOwnProperty( element.modelo ) ) {
            prop = element.modelo;

            // Asigna un color random
            this.coloresObj[prop] = this.colores[ Math.floor(( Math.random() * this.colores.length )) ];
          }

          let property = element.modelo

          element.color = this.coloresObj[property]
        });
        // Invierte el orden de la lista para visualizar al principio el último, y al final, el que va entrando
        this.manifiestosList!.reverse()

    });

  }

  ocultar() {
    scroll(0, 280);
  }

  onSetQty() {
    this.initialQty = this.qtyForm!.value.cantidad;
  }

}
