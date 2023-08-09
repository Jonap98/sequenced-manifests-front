import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'manifiestos',
    loadChildren: () => import('./manifiestos/manifiestos.module').then( m => m.ManifiestosModule ),
  },
  { path: '404', component: Error404PageComponent },
  { path: '', redirectTo: 'manifiestos', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
