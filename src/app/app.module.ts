import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';
import { ServiciosComponent } from './component/servicios/servicios.component';
import { CitasComponent } from './component/citas/citas.component';
import { NoticiasComponent } from './component/noticias/noticias.component';
import { TiendaComponent } from './component/tienda/tienda.component';
import { Error404Component } from './component/error404/error404.component';
import { MicuentaComponent } from './component/micuenta/micuenta.component';
import { TerminosycondicionesComponent } from './component/terminosycondiciones/terminosycondiciones.component';
import { ofertasService } from './services/ofertas.service';
import { firebaseService } from './services/firebase.service';
import { noticiasService } from './services/noticias.service';
import { NoticiaIndividualComponent } from './component/noticia-individual/noticia-individual.component';
import { ReservarCitaComponent } from './component/reservar-cita/reservar-cita.component';
import { FormsModule } from '@angular/forms';
import { userService } from './services/user.service';
import { LoginGuardianService } from './services/guardian.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    ServiciosComponent,
    CitasComponent,
    NoticiasComponent,
    TiendaComponent,
    Error404Component,
    MicuentaComponent,
    TerminosycondicionesComponent,
    NoticiaIndividualComponent,
    ReservarCitaComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule
    
  ],
  providers: [ofertasService, firebaseService, noticiasService, userService, LoginGuardianService],
  bootstrap: [AppComponent]
})
export class AppModule { }
