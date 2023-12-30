import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { Error404Component } from './component/error404/error404.component';
import { ServiciosComponent } from './component/servicios/servicios.component';
import { CitasComponent } from './component/citas/citas.component';
import { NoticiasComponent } from './component/noticias/noticias.component';
import { TiendaComponent } from './component/tienda/tienda.component';
import { MicuentaComponent } from './component/micuenta/micuenta.component';
import { TerminosycondicionesComponent } from './component/terminosycondiciones/terminosycondiciones.component';

const routes: Routes = [
  {path:'', component: InicioComponent},
  {path:'servicios', component: ServiciosComponent},
  {path:'citas', component: CitasComponent},
  {path:'noticias', component: NoticiasComponent},
  {path:'tienda', component: TiendaComponent},
  {path:'micuenta', component: MicuentaComponent},
  {path:'terminos', component: TerminosycondicionesComponent},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
