import { Component, OnInit } from '@angular/core';
import { firebaseService } from 'src/app/services/firebase.service';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getApp } from "firebase/app";
import { collection, doc, setDoc, addDoc, getDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc, onSnapshot} from "firebase/firestore"; 
import { noticias } from 'src/app/models/noticias.model';
import { noticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit{

  constructor(private firebaseService: firebaseService, private noticiasService: noticiasService){}

  //Inicia el array noticias
  noticias:noticias[]=[];
  
  //Obtiene fecha de hoy
  public fecha = new Date();

  // Initialize Firestore
  private db = this.firebaseService.db;
  private storage = getStorage();

  ngOnInit(): void {

    //this.getAllnews();
    this.obtenerDatos();
    //this.addDoc();
  }

  //Obtener todas las noticias
  async getAllnews(){

    const AddQuery = query(collection(this.db, "novedades"), orderBy("fecha"));

    const querynews = await getDocs(AddQuery);

    //Iteración sobre los documentos devueltos por la consulta a Firestore con un bucle for of(como el foreach)
    //querynews.docs hace referencia a todos los documentos devueltos por firestore
    for (const doc of querynews.docs) {
          const registro = doc.data();
          //['imagen'] va referido a la base de datos y no al array nuevaNoticia
          console.log(registro['imagen']);

          //Referencia a la imagen que queremos
          const storageRef = ref(this.storage, registro['imagen']);

          try{
          //Obtiene la URL completa del storage donde esté el archivo con el nombre que contenga "registro['imagen']"
          const url = await getDownloadURL(storageRef);

          //creamos el array donde se almacenan los datos de la consulta de firestore
          const nuevaNoticia = {
            imagen: url,
            titulo: registro['titulo'],
            texto: registro['texto'],
            fecha: registro['fecha']
          };

          //Añadimos los datos del array de antes al de las noticias
          this.noticias.push(nuevaNoticia);
          console.log(this.noticias);
          console.log(registro['imagen']);
          console.log(nuevaNoticia['imagen']);
        } catch (error){
          console.error('Ha habido un error:', error);
        }
          
      }
      
  }

  nuevoregistro = {
    imagen: 'pexels-fox-1595385.jpg',
    texto: 'esto es texto de prueba',
    titulo: 'nuevo titulo',
    fecha: this.fecha
  }
  
  addDoc(){
    addDoc(collection(this.db, "novedades"), this.nuevoregistro)
  }

  //Obtiene los datos de las noticias desde el servicio noticias. Al devolver la función getALLdocuments del servicio una promesa
  //debe usarse then para meter los datos que llegan del servicio en el array de noticias de este componente y llamarlos en el HTML.
  obtenerDatos(){
    this.noticiasService.getALLdocuments().then(datos =>{
      this.noticias = datos;
    })
  }

}
