import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UsuarioService } from './../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;
declare function init_plugins();

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  recuerdame: boolean;
  auth2: any;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '661082685865-1p5807m2b6t862ofbd41fdviirhannbl.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.log(profile);
    });
  }

  ingresar(f: NgForm) {
    if (f.invalid) {
      return;
    }

    const usuario = new Usuario(null, f.value.email, f.value.password);
    this.usuarioService.login(usuario, f.value.recuerdame).subscribe((result) => {
      this.router.navigate(["/dashboard"]);
    });
  }
}
