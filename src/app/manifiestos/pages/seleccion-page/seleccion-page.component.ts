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
    localStorage.removeItem('num_serie');
    localStorage.removeItem('diferencia');

    this.seleccionService.getBrazos()
      .subscribe( ({data}) => {
        console.log(data);
        this.brazos = data;
      })

  }


  public selectedLine?: any;
  public selectedStation?: any;

  public secciones?: any[];
  public ubicaciones?: any[];

  seleccionarBrazo( brazo: any ) {
    this.selectedLine = brazo;
    localStorage.setItem('brazo', brazo.brazo)

    this.seleccionService.getSecciones(brazo.brazo)
      .subscribe( secciones => {
        console.log(secciones);
        this.secciones = secciones.data;
      })
  }

  seleccionarSeccion( seccion: any ) {
    localStorage.setItem('seccion', seccion)
    // this.router.navigate(['manifiestos/manifiestos']);
    console.log(this.selectedLine)
    this.selectedStation = seccion;
    console.log(seccion)
    this.seleccionService.getUbicaciones(this.selectedLine.brazo, seccion)
      .subscribe( ubicaciones => {
        console.log(ubicaciones);
        this.ubicaciones = ubicaciones.data;
      })
  }

  seleccionarUbicacion( ubicacion: string ) {
    localStorage.setItem('ubicacion', ubicacion)
    this.router.navigate(['manifiestos/manifiestos']);
  }

}
