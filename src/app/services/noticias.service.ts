import { Injectable } from "@angular/core";
import { firebaseService } from 'src/app/services/firebase.service';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { getApp } from "firebase/app";
import { collection, doc, setDoc, addDoc, getDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc, onSnapshot, documentId, DocumentReference, DocumentSnapshot} from "firebase/firestore"; 
import { noticias } from 'src/app/models/noticias.model';

@Injectable()

export class noticiasService {

    constructor(private firebaseService:firebaseService){}

    //Inicia el array noticias
    noticias:noticias[]=[];

    // Initialize Firestore
    private db = this.firebaseService.db;
    private storage = getStorage();

    //Obtenemos todas las noticias
    async getALLdocuments(){
        const usersQuery = query(collection(this.db, "novedades"), orderBy('fecha'));

        const querynews = await getDocs(usersQuery);

        //Iteración sobre los documentos devueltos por la consulta a Firestore con un bucle for of(como el foreach)
        //querynews.docs hace referencia a todos los documentos devueltos por firestore
        for (const doc of querynews.docs) {
          const registro = doc.data();

          //Referencia a la imagen que queremos
          //['imagen'] va referido a la base de datos y no al array nuevaNoticia
          const storageRef = ref(this.storage, registro['imagen']);

          try{
          //Obtiene la URL completa del storage donde esté el archivo con el nombre que contenga "registro['imagen']"
          const url = await getDownloadURL(storageRef);

          //creamos el array donde se almacenan los datos de la consulta de firestore
          const nuevaNoticia = {
            imagen: url,
            titulo: registro['titulo'],
            texto: registro['texto'],
            fecha: registro['fecha'],
            id: doc.id
          };
          
          //Añadimos los datos del array de antes al de las noticias
          this.noticias.push(nuevaNoticia);
        } catch (error){
          console.error('Ha habido un error:', error);
        }
          
      }
      //debe devolver el array de noticias para luego pasarlo al componente.ts
      return this.noticias;
   }
      
   
    //Obtenemos 3 últimas noticas para el inicio
    async getLast3documents(){
      const usersQuery = query(collection(this.db, "novedades"), orderBy('fecha', "desc"), limit(3));

      const querynews = await getDocs(usersQuery);

      //Iteración sobre los documentos devueltos por la consulta a Firestore con un bucle for of(como el foreach)
      //querynews.docs hace referencia a todos los documentos devueltos por firestore
      for (const doc of querynews.docs) {
        const registro = doc.data();

        //Referencia a la imagen que queremos
        //['imagen'] va referido a la base de datos y no al array nuevaNoticia
        const storageRef = ref(this.storage, registro['imagen']);

        try{
        //Obtiene la URL completa del storage donde esté el archivo con el nombre que contenga "registro['imagen']"
        const url = await getDownloadURL(storageRef);

        //creamos el array donde se almacenan los datos de la consulta de firestore
        const nuevaNoticia = {
          imagen: url,
          titulo: registro['titulo'],
          texto: registro['texto'],
          fecha: registro['fecha'],
          id: doc.id
        };

        //Añadimos los datos del array de antes al de las noticias
        this.noticias.push(nuevaNoticia);
      } catch (error){
        console.error('Ha habido un error:', error);
      }
        
    }
    //debe devolver el array de noticias para luego pasarlo al componente.ts
    return this.noticias;
 }


 //Obtenemos la noticia por ID para la noticia individual
    async getNoticiasById(indice:string){
      //VACIAMOS EL ARRAY NOTICIAS YA QUE COGE LOS VALORES DE LAS FUNCIONES DE LAS FUNCIONES ANTERIORES
      this.noticias=[];

      const usersQuery = doc(this.db, 'novedades', indice);

      const querynews = await getDoc(usersQuery);

      const registro = querynews.data();
       
      if(registro){
      const storageRef = ref(this.storage, registro['imagen']);
      const url = await getDownloadURL(storageRef);
      const nuevaNoticia = {
        imagen: url,
        titulo: registro['titulo'],
        texto: registro['texto'],
        fecha: registro['fecha'].toDate().toLocaleDateString(), 
        id: indice
      };
      //toDate() convierte el timestamp de firestore a formato date de javascript
      //toLocaleDateString() convierte el date al formato del idioma del navegador usado
      this.noticias.push(nuevaNoticia);
      console.log(this.noticias);
      }else{
        console.log('El documento no contiene datos válidos.');
      }

      return this.noticias;
 }
    
}