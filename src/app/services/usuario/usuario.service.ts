import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token && this.token.length > 1;
  }

  cargarStorage() {
    this.token = localStorage.getItem('token') || '';
    this.usuario = JSON.parse(localStorage.getItem('usuario')) || null;
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  login(usuario: Usuario, recuerdame: boolean) {
    return this.http.post(`${URL}/login`, usuario)
            .pipe(
              map((result: any) => {
                localStorage.setItem('id', result.id);
                localStorage.setItem('token', result.token);
                localStorage.setItem('usuario', JSON.stringify(result.usuario));

                this.token = result.token;
                this.usuario = result.usuario;
              })
            );
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(`${URL}/usuario`, usuario)
    .pipe(
      map((resp: any) => {
        Swal.fire({
          text: 'usuario creado',
          icon: 'success',
          confirmButtonText: 'Ok'
          });
        return resp.usuario;
      })
    );
  }
}
