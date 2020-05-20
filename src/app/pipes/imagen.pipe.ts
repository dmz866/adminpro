import { Pipe, PipeTransform } from '@angular/core';
import { environment } from './../../environments/environment.prod';

const URL = environment.url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    const imgURL = `${URL}/img`;

    if(!img) {
      return `${imgURL}/usuarios/NOIMAGEN`;
    }

    return `${imgURL}/${tipo}/${img}`;
  }

}
