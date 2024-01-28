import { Component, OnInit } from '@angular/core';
import { ofertasService } from 'src/app/services/ofertas.service';
import { firebaseService } from 'src/app/services/firebase.service';
import { collection, doc, setDoc, addDoc, getDoc, getDocs, query, where, orderBy, limit, deleteDoc, updateDoc, onSnapshot} from "firebase/firestore"; 
import { ofertas } from 'src/app/models/ofertas.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit{

  constructor(private firebaseService: firebaseService, private ofertasService: ofertasService){}
  
  oferta:ofertas[]=[];

  // Initialize Firestore
  private db = this.firebaseService.db;
  
    private docRef =  {
      first: "Pepe",
      last: "xoxo",
      born: 1515
    };
  
    //Async declara función asíncrona
    //Await indica que la función que lo lleve se ejecutará antes que lo que vaya detrás
    /*Crea y añade documento*/
    async AddDocument(){
      await addDoc(collection(this.db, "users"), this.docRef).then((response) => {
        console.log(response.id)
      })
    }

    /*Obtiene todos los documentos*/
     GetAllDocuments(){
      const AddQuery = query(collection(this.db, "ofertas"), orderBy("orden"));
      //const obtenerDocs = getDocs(AddQuery); Esto obtenía datos sólo una vez
      const unsubscribe =  onSnapshot(AddQuery, (obtenerDocs) =>{
      //onSnapshot permite actualizar los registros en la app dependiendo de los cambios en la base de datos
      //const obtenerDocs = await getDocs(collection(this.db, "ofertas"));
      //Esto es sólo para una consulta simple, si es compuesta, separar la consulta de su ejecución.
      this.oferta = [];
      obtenerDocs.forEach((doc) =>{
          
          const registro = doc.data();
          const nuevaOferta = 
            {
              descripcion: registro['descripción'],
              nombre: registro['nombre'],
              precio: registro['precio']
          }
          //En este array el registro tendrá el nombre de la base de datos (descripción), pero en el HTML lo cogerá del modelo (descripcion)
        this.oferta.push(nuevaOferta);
          //Si no lo hacemos con el push, el array sólo registrará el último registro que metamos.
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`); 
          //Se usa JSON.stringify para convertirlo a JSON, ya que si no se intenta concatenar la ID (number) con un string.
          console.log(this.oferta);
        })
      })
    } 


      /*Obtener documentos dependiendo de un dato de la tabla*/
      async GetDocumentBylast(){
        const usersQuery = query(collection(this.db, "users"), where("last", "==", "Lorente"), orderBy("last"), limit(3));

        const queryBylast = await getDocs(usersQuery);
        queryBylast.forEach((doc) => {
          console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
          //Se utiliza `${doc.id}` y no doc.id para no tener que concatenar y así incrustar variables directamente
          //Con ello interpolamos el valor de doc.id dentro de un string. Esto se llama template literals o plantillas literales.
          const data = doc.data();
          const firstValue = data['born'];
          console.log(`${doc.id} => ${firstValue}`);
          //Obtenemos el valor que queremos de la consulta. data() devuelve un array, por eso hay que usar data['born'].
        })
        
      }
        
      /*Borrar registro*/
     async DeleteDocumentBylast(){
      const usersQuery = query(collection(this.db, "users"), where ("last", "==", "xoxo"))
      const deletebylast = await getDocs(usersQuery);

      deletebylast.forEach(async (doc) => {
        try{
          await deleteDoc(doc.ref); //cada documento tiene una referencia, se usa esto para interactuar directamente con él.
        }
        catch (error){
        console.error(`Error al intentar eliminar el documento: ${error}`)
      }})
      //Para eliminar un documento con una consulta que va a devolver varios documentos, primero hay que obtenerlo con getDocs.

      /*Elimina documento por id*/
      //const deletebylast = await deleteDoc(doc(this.db, "users", "aODGwUFWmRjOug1NTwSq"));
     }
    
    /*Actualiza registro*/
     async UpdateDocumentBylast(){
      const usersQuery = query(collection(this.db, "users"), where ("last", "==", "Lorente"))
      const updatebylast = await getDocs(usersQuery);

      updatebylast.forEach(async (doc) => {
        try{
          await updateDoc(doc.ref, {last: 'Xoxo'}); //cada documento tiene una referencia, se usa esto para interactuar directamente con él.
        }
        catch (error){
        console.error(`Error al intentar eliminar el documento: ${error}`)
      }})
      //Para actualizar un documento con una consulta que va a devolver varios documentos, primero hay que obtenerlo con getDocs.

     }
  

  ngOnInit(): void {

    this.GetAllDocuments();
    
  }
  
}


  
