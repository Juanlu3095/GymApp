import { Component, OnInit } from '@angular/core';
import { noticias } from 'src/app/models/noticias.model';
import { noticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  constructor(private noticiasService: noticiasService){}

  //Inicia el array noticias
  noticias:noticias[]=[];
  
  ngOnInit(): void {

    this.obtenerNoticias();
    
  }

  obtenerNoticias(){
    this.noticiasService.getLast3documents().then( datos =>{
      this.noticias = datos;
    })
  }
}
