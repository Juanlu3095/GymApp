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
import { firesbaseService } from './services/firebase.service';


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
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ofertasService, firesbaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
