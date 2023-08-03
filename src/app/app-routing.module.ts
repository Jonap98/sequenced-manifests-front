import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'manifiestos',
    loadChildren: () => import('./manifiestos/manifiestos.module').then( m => m.ManifiestosModule ),
  },
  { path: '', redirectTo: 'manifiestos', pathMatch: 'full' },
  { path: '**', redirectTo: 'manifiestos' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
