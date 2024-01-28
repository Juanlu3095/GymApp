import { Component, OnInit } from '@angular/core';
import { noticias } from 'src/app/models/noticias.model';
import { noticiasService } from 'src/app/services/noticias.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-noticia-individual',
  templateUrl: './noticia-individual.component.html',
  styleUrls: ['./noticia-individual.component.css']
})
export class NoticiaIndividualComponent implements OnInit{

  constructor(private noticiaService: noticiasService, private router:Router, private route:ActivatedRoute){}

  indice:string;

  noticias:noticias[]=[];
  
  ngOnInit(): void {

   //HACEMOS QUE LA VARIABLE INDICE SEA EL INDICE DE LA URL DE LA NOTICIA INDIVIDUAL
    this.indice = this.route.snapshot.params['indice'];
    console.log(this.indice);

    this.obtenerNoticiaId(this.indice);
    

  }

  obtenerNoticiaId(indice:string){
    this.noticiaService.getNoticiasById(indice).then(dato=>{
      this.noticias = dato;
    })
  }
}
