import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from './../subirArchivo/subir-archivo.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, private router: Router, private subirArchivoService: SubirArchivoService) {
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
          this.guardarStorage(result.id, result.token, result.usuario);
        })
      );
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.token = token;
    this.usuario = usuario;
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

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${URL}/usuario/${usuario._id}?token=${this.token}`, usuario)
      .pipe(map((result: any) => {
        this.guardarStorage(result.usuario._id, this.token, result.usuario);
        Swal.fire({
          text: 'usuario actualizado',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }));
  }

  cambiarImagen(archivo: File, tipo: string, id: string) {
    this.subirArchivoService.subirArchivo(archivo, tipo, id).then((res: any) => {
      this.usuario.img = res.img;
    })
      .catch(error => {
        console.log(error);
      });
  }
}
