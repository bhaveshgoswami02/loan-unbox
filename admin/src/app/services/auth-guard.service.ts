import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem("uid") == "VhscKjXOlGgS4PutnCC45FjRrN93") {
      return true
    }
    else {
      this.router.navigateByUrl("/auth")
      return false
    }
  }
}
