import { Component, OnInit } from '@angular/core';
import { ofertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit{

  constructor(private ofertasservice: ofertasService){}

  ngOnInit(): void {
    console.log(this.ofertasservice.getOfertas);
  }
  
}
