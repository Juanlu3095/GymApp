import { Injectable } from "@angular/core";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Observable } from "rxjs";

@Injectable()

export class userService {

    constructor(){}

    //EN PRINCIPIO NO SERÁ NECESARIO PORQUE SI NO HAY USUARIO, NOS LLEVA A LOGIN Y SÓLO SE USA EN LOGIN.COMPONENT
    login(){}

    //CIERRA LA SESIÓN EN FIREBASE
    logout(){
        const auth = getAuth();
        auth.signOut();
    }

    //REGISTRAR UN NUEVO USUARIO
    registro(){}

    //SE COMPRUEBA SI EL USUARIO ESTÁ LOGUEDADO, SE USARÁ PARA EL AUTHGUARD
    comprobarLogin(){
      const auth = getAuth();
      return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
           unsubscribe(); //Se usa para dejar de escuchar cambios adicionales hasta resolver el actual. Una vez terminada se sigue escuchando.
           resolve(user); //se devuelve el valor del user, que puede ser nulo si no hay logueo
        }, reject); //Si hay error durante el proceso se ejecuta el rechazo
     });
        
    }

    //DEVUELVE UN OBSERVABLE QUE REFLEJA EL ESTADO DE LA AUTENTICACIÓN EN TIEMPO REAL CON onAuthStateChanged
    obtenerObservableLogin(): Observable<User | null> {
      return new Observable((observer) => { //crea un nuevo observable
        const auth = getAuth();
  
        //FUNCIÓN PARA NOTIFICAR AL OBSERVABLE CUANDO SE VEA UN CAMBIO CON AuthStateChanged DE UN EVENTO Y DEVUELVE UN USER
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          observer.next(user);
        });
  
        // Importante: Desuscribirse cuando el observable deja de ser necesario
        return () => unsubscribe();
      });
    }

    //OBTENER LOS DATOS DEL USUARIO LOGUEADO
    obtenerUsuarioActual(dato:string){
        const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
        if (user) {

          const uid = user.uid;
          const name = user.displayName;
          const email = user.email;

          if (dato == 'uid'){
            return uid;
          }else if (dato == 'name'){
            return name;
          }else if (dato == 'email'){
            return email;  
          }else{
            return null
          }

        } else{

          return('No hay usuario logueado');
        }
      })
    }

    //OBTENER PERMISOS DEL USUARIO LOGUEADO PARA EL MENÚ
    obtenerPermisoUsuario(){}
    
    
}