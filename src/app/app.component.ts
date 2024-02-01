import { Component, OnInit, OnDestroy } from '@angular/core';
import { firebaseService } from './services/firebase.service';
import { userService } from './services/user.service';
import { Observable, from, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GymApp';

  constructor(private firebaseservice: firebaseService, private userService: userService){};

  loginOk:Observable<any>;
  public loginSubscription: Subscription;

  comprobaruser(){
    this.loginOk = from(this.userService.comprobarLogin());
    
  }

  ngOnInit(): void {
      this.loginOk = this.userService.obtenerObservableLogin();
      //CON EL subscribe() te suscribes al observable y con ello se manejan los cambios en la autenticación.
      this.loginSubscription = this.loginOk.subscribe((loggedIn) => {
        // Aquí puedes realizar acciones dependiendo del estado de autenticación
        // Por ejemplo, actualizar variables, mostrar/ocultar elementos, etc.
        if (loggedIn) {
          console.log('Usuario autenticado, mostrar menú.');
          // Realiza acciones cuando el usuario está autenticado
        } else {
          console.log('Usuario no autenticado, ocultar menú.');
          // Realiza acciones cuando el usuario no está autenticado
        }
      });

    }

    ngOnDestroy(): void {
      // Importante: Desuscribirse para evitar posibles fugas de memoria al destruir el componente
      if (this.loginSubscription) {
        this.loginSubscription.unsubscribe();
      }
    }
  }




