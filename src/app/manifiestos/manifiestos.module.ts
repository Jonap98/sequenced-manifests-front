import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManifiestosRoutingModule } from './manifiestos-routing.module';
import { VerManifiestosPageComponent } from './pages/ver-manifiestos-page/ver-manifiestos-page.component';
import { SeleccionPageComponent } from './pages/seleccion-page/seleccion-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';


@NgModule({
  declarations: [
    VerManifiestosPageComponent,
    SeleccionPageComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    ManifiestosRoutingModule
  ]
})
export class ManifiestosModule { }
