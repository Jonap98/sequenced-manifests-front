import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerManifiestosPageComponent } from './pages/ver-manifiestos-page/ver-manifiestos-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SeleccionPageComponent } from './pages/seleccion-page/seleccion-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'seleccion', component: SeleccionPageComponent },
      { path: 'manifiestos', component: VerManifiestosPageComponent },
      { path: '', redirectTo: 'seleccion', pathMatch: 'full' },
      { path: '**', redirectTo: 'seleccion' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManifiestosRoutingModule { }
