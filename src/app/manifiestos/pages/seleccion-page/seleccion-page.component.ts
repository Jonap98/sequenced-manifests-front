import { Component, OnInit } from '@angular/core';
import { SeleccionService } from '../../services/seleccion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion-page',
  templateUrl: './seleccion-page.component.html',
  styleUrls: ['./seleccion-page.component.css']
})
export class SeleccionPageComponent implements OnInit {

  constructor(
    private seleccionService: SeleccionService,
    private router: Router
  ) {}

  public brazos = [];

  ngOnInit(): void {
    localStorage.removeItem('brazo');
    localStorage.removeItem('seccion');

    this.seleccionService.getBrazos()
      .subscribe( ({data}) => {
        console.log(data);
        this.brazos = data;
      })

  }


  public selectedLine?: any;

  public secciones?: any[];

  seleccionarBrazo( brazo: any ) {
    this.selectedLine = brazo;
    localStorage.setItem('brazo', brazo.brazo)

    this.seleccionService.getSecciones(brazo.brazo)
      .subscribe( secciones => {
        console.log(secciones);
        this.secciones = secciones.data;
      })
  }

  seleccionarSeccion( seccion: string ) {
    localStorage.setItem('seccion', seccion)
    this.router.navigate(['manifiestos/manifiestos']);
  }

}
