import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem("uid") == environment.adminUid) {
      return true
    }
    else {
      this.router.navigateByUrl("/auth")
      return false
    }
  }
}
