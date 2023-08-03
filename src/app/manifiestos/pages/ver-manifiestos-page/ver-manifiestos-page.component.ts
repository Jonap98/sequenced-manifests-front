import { Component, Input, OnInit } from '@angular/core';
import { VerManifiestosService } from '../../services/ver-manifiestos.service';
import { Router } from '@angular/router';
import { Manifiesto } from '../../interfaces/manifiestos';
import { Observable } from 'rxjs';
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

    this.manifiestosService.getManifiestos(this.brazo, this.seccion)
      .subscribe( ({data})  => {
        console.log(data)
        this.manifiestosList = data;
        this.manifiestosList!.reverse()


      });
  }

  @Input()
  public listaDeIds?: any[];

  public seccion = '';
  public brazo = '';

  public imagen = 'http://10.40.129.40:99/tkav/storage/';


  public interval?: any;




  public id?: any;

  cancelInterval() {
    if (this.id) {
      clearInterval(this.id);
    }
  }




  public timmers?: any[];
  public lista: any[] = [];
  ngOnInit(): void {
    this.id = null;
    this.listaDeIds = [];

    this.id = setInterval(() => {
      if( this.router.url == '/manifiestos/manifiestos' ) {
        this.actualizar();
        console.log(this.id)
        console.log(this.lista)
      }
    }, 5000);

    this.lista.push(this.id);

    // console.log(this.id)
    // console.log(this.timmers)

    this.seccion = localStorage.getItem('seccion') ?? '';
    this.brazo = localStorage.getItem('brazo') ?? '';

    // this.manifiestosService.getManifiestos(this.brazo, this.seccion)
    //   .subscribe( ({data})  => {
    //     console.log(data)
    //     this.manifiestosList = data;
    //     this.manifiestosList!.reverse()


    //   });

      console.log('Ruta actual')
      // this.interval = setInterval(() => {
      //   if( this.router.url == '/manifiestos/manifiestos' ) {
      //     this.actualizar();
      //   }
      //   // console.log('Actualizado!')
      // }, 5000);


  }

  // cancelInterval() {
  //   // console.log(this.interval)
  //   this.interval.cancel();
  // }

  regresar() {
    this.router.navigate(['manifiestos/seleccion']);
  }

  actualizar() {
    console.log(this.brazo)
    // console.log(this.seccion)
    // console.log(localStorage.getItem('seccion'))
    // this.manifiestosService.getManifiestos(this.brazo, this.seccion)
    this.manifiestosService.getManifiestos(localStorage.getItem('brazo') ?? '', localStorage.getItem('seccion') ?? '')
      .subscribe( ({data})  => {
        // console.log(data)
        this.manifiestosList = data;
        this.manifiestosList!.reverse()
      });
  }




}
