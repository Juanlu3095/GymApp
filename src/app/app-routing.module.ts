import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes, mapToCanActivate } from '@angular/router';
import { inject } from '@angular/core';
import { InicioComponent } from './component/inicio/inicio.component';
import { Error404Component } from './component/error404/error404.component';
import { ServiciosComponent } from './component/servicios/servicios.component';
import { CitasComponent } from './component/citas/citas.component';
import { NoticiasComponent } from './component/noticias/noticias.component';
import { NoticiaIndividualComponent } from './component/noticia-individual/noticia-individual.component';
import { TiendaComponent } from './component/tienda/tienda.component';
import { ReservarCitaComponent } from './component/reservar-cita/reservar-cita.component';
import { MicuentaComponent } from './component/micuenta/micuenta.component';
import { TerminosycondicionesComponent } from './component/terminosycondiciones/terminosycondiciones.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard, LoginGuardianService } from './services/guardian.service';

const routes: Routes = [
  {path:'', component: InicioComponent, canActivate: [LoginGuardianService]},
  {path:'servicios', component: ServiciosComponent},
  {path:'noticias', component: NoticiasComponent},
  {path:'noticia/:indice', component: NoticiaIndividualComponent},
  {path:'tienda', component: TiendaComponent},
  {path:'citas', component: CitasComponent},
  {path:'reservar-cita', component: ReservarCitaComponent},
  {path:'micuenta', component: MicuentaComponent},
  {path:'terminos', component: TerminosycondicionesComponent},
  {path:'login', component: LoginComponent},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
