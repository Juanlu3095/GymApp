import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { where, query, doc, getDoc } from 'firebase/firestore';
import { firebaseService } from 'src/app/services/firebase.service';
import { Route, Router } from '@angular/router';
import { initializeApp } from 'firebase-admin';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private firebaseService:firebaseService, private userService: userService, private router:Router){}

  ngOnInit(): void {
    this.comprobarUsuario();
    this.userService.obtenerUsuarioActual('email');
    this.userService.comprobarLogin();
  }

  MensajeError:string="";
  rolUsuario:string; // 1=cliente, 2=admin
  private db = this.firebaseService.db;

  //MUESTRA EL SPAN CARGANDO
  cargandoMostrar(){
    const reloj = document.getElementsByClassName("msg-cargando");
    reloj[0].classList.add('msg-cargando-d-block');
    reloj[0].classList.remove('msg-cargando-d-none');
  }

  //QUITA EL SPAN CARGANDO
  cargandoQuitar(){
    const reloj = document.getElementsByClassName("msg-cargando");
    reloj[0].classList.remove('msg-cargando-d-block');
    reloj[0].classList.add('msg-cargando-d-none');
  }

  async getPermisosUsuario(uid:string){
    const obtenerPermisos = doc(this.db, "users", uid)
    const obtenerDoc = await getDoc(obtenerPermisos);
    const resultado = obtenerDoc.data();

    if (resultado && resultado['permisos']){
      const permisos = resultado['permisos'];
      return permisos;
    }else{
      return null;
    }
    
  }

  login(form:NgForm){
    const auth = getAuth();
    const email = form.value.email;
    const password = form.value.password;

    signInWithEmailAndPassword(auth, email, password).then( async (userCredential) => {
      const user = userCredential.user.uid;
      console.log(user);
      const permiso = await this.getPermisosUsuario(user);
      console.log(permiso);

      if (permiso === '2'){
        console.log('correcto');
        this.rolUsuario = "2";
      }else if (permiso === "1"){
        console.log('Hola cliente');
        this.rolUsuario = "1";
      }

      auth.currentUser?.getIdToken().then((token)=>{
        console.log(token);
        
      })
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      this.cargandoQuitar();

      if (errorCode == 'auth/invalid-email'){
        console.log('Por favor, introduzca un email válido.');
        this.MensajeError = "Por favor, introduzca un email válido.";
      } else if (errorCode == 'auth/missing-password'){
        console.log('La contraseña aportada no es correcta.');
        this.MensajeError = "La contraseña aportada no es correcta.";
      }
      console.log(`Error con código: ${errorCode}`);
      console.log(`Error con mensaje: ${errorMessage}`);
    })
  }

  //CIERRA LA SESIÓN EN FIREBASE
  logout(){
    this.userService.logout();
  }

  //COMPRUEBA SI HA USUARIO LOGUEADO EN FIREBASE
  comprobarUsuario(){
  const auth = getAuth();

  onAuthStateChanged(auth, async (user) => {
    if (user) {

      //MIRAR CÓMO SE HACE EN EL CURSO DE PÍLDORAS INFORMÁTICAS
      /* if (location.href == 'http://localhost:4200/login'){
        this.router.navigate(['']);
      } */

      const uid = user.uid;
      const name = user.displayName;
      const email = user.email;
      console.log(email);

      auth.currentUser?.getIdToken().then( (token) => {
        console.log(token);
        
      })
      
      //Al ser onAuthStateChanged una promesa (=>) debemos usar async y await para sacar el valor de permisos
      const permiso = await this.getPermisosUsuario(uid);
      console.log(permiso);

      

    } else{

      console.log('No hay usuario logueado');
    }
  })
}
}
