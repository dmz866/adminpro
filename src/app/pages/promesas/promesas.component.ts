import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contar()
      .then((val) => {
        console.log("termino", val);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  contar() {
    let contador = 0;
    return new Promise<boolean>((res, rej) => {
      const intervalo = setInterval(() => {
        console.log(contador++);
        if (contador === 3) {
          res(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

  ngOnInit() {}
}
