import { Injectable, Inject } from "@angular/core";
import { Ajustes } from "../../interfaces/interfaces";
import { DOCUMENT } from "@angular/platform-browser";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  private ajustes: Ajustes = {
    temaUrl: "assets/css/colors/default.css",
    tema: "default",
  };

  getAjustes() {
    return this.ajustes;
  }

  guardarAjustes() {
    localStorage.setItem("ajustes", JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    this.ajustes = JSON.parse(localStorage.getItem("ajustes")) || this.ajustes;
    this.aplicarAjustes(this.ajustes.tema);
  }

  aplicarAjustes(tema: string) {
    const temaUrl = `assets/css/colors/${tema}.css`;
    this._document.getElementById("tema").setAttribute("href", temaUrl);

    this.ajustes = {
      temaUrl,
      tema,
    };

    this.guardarAjustes();
  }
}
