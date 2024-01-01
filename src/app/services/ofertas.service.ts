import { Injectable } from "@angular/core";
import { firesbaseService } from "./firebase.service";
import { collection, query, where, getDocs } from "firebase/firestore";


@Injectable()

export class ofertasService {

    constructor(private firebaseservice: firesbaseService){}

    ofertas = collection(this.firebaseservice.db, "ofertas");

    getOfertas = query(this.ofertas, where("Nombre", "==", "Medio"));

}