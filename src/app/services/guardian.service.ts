import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, CanActivateFn } from "@angular/router";
import { Observable } from "rxjs";
import { userService } from "./user.service"; 
import { Injectable, inject } from "@angular/core";

@Injectable()
export class LoginGuardianService {

  constructor(private userService:userService, private router:Router){}

    async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if( await this.userService.comprobarLogin()){
            console.log('hola');
            return true;
        }

        else{
            this.router.navigate(['/login']);
            console.log('adios')
            return false;
        }
    }

}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(LoginGuardianService).canActivate(next, state);
  }