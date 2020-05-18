import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UsuarioService } from './../usuario/usuario.service';
import { RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate  {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.usuarioService.estaLogueado()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
