import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(private http: HttpClient) { }

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((res, rej) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            Swal.fire({
              text: 'Imagen cargada',
              icon: 'success',
              confirmButtonText: 'Ok'
            });

            res(JSON.parse(xhr.response));
          }
          else {
            rej(xhr.response);
          }
        }
      };

      const url = `${URL}/upload/${tipo}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
