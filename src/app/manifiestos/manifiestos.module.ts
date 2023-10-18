import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ManifiestosRoutingModule } from './manifiestos-routing.module';
import { VerManifiestosPageComponent } from './pages/ver-manifiestos-page/ver-manifiestos-page.component';
import { SeleccionPageComponent } from './pages/seleccion-page/seleccion-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SincronizarManifiestosComponent } from './components/sincronizar-manifiestos/sincronizar-manifiestos.component';
import { HideMissingDirective } from './pages/ver-manifiestos-page/hide-missing.directive';


@NgModule({
  declarations: [
    VerManifiestosPageComponent,
    SeleccionPageComponent,
    LayoutPageComponent,
    SincronizarManifiestosComponent,
    HideMissingDirective
  ],
  imports: [
    CommonModule,
    ManifiestosRoutingModule,
    ReactiveFormsModule
  ]
})
export class ManifiestosModule { }
