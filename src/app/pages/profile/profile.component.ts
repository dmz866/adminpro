import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imgTemp: File;
  imgPreview;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  seleccionarImagen(file: File) {
    if (!file) {
      this.imgTemp = null;
      return;
    }

    this.imgTemp = file;

    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgPreview = reader.result;
    };
  }

  cambiarImagen() {
    this.usuarioService.cambiarImagen(this.imgTemp, 'usuarios', this.usuario._id);
  }

  actualizar() {
    this.usuarioService.actualizarUsuario(this.usuario).subscribe((result) => {

    });
  }
}
