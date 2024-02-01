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
  {path:'servicios', component: ServiciosComponent, canActivate: [LoginGuardianService]},
  {path:'noticias', component: NoticiasComponent, canActivate: [LoginGuardianService]},
  {path:'noticia/:indice', component: NoticiaIndividualComponent, canActivate: [LoginGuardianService]},
  {path:'tienda', component: TiendaComponent, canActivate: [LoginGuardianService]},
  {path:'citas', component: CitasComponent, canActivate: [LoginGuardianService]},
  {path:'reservar-cita', component: ReservarCitaComponent, canActivate: [LoginGuardianService]},
  {path:'micuenta', component: MicuentaComponent, canActivate: [LoginGuardianService]},
  {path:'terminos', component: TerminosycondicionesComponent, canActivate: [LoginGuardianService]},
  {path:'login', component: LoginComponent},
  {path: '**', component: Error404Component, canActivate: [LoginGuardianService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
