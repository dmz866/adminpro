import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, interval, Subscription } from "rxjs";
import { retry, map, filter } from "rxjs/operators";

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.retornarObs()
      //.pipe(retry(2))
      .pipe(
        map((resultado) => {
          return Number(resultado.valor);
        }),
        filter((valor: any, index: number) => {
          if (valor % 2 === 1) {
            return true;
          }

          return false;
        })
      )
      .subscribe(
        (num) => {
          console.log(num);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("complete");
        }
      );
  }

  retornarObs(): Observable<any> {
    let cont = 0;
    return new Observable((observer) => {
      const intervalo = setInterval(() => {
        cont++;

        const salida = { valor: cont };

        observer.next(salida);

        if (cont === 10) {
          clearInterval(intervalo);
          observer.complete();
        }

        //if (cont === 2) {
        //  clearInterval(intervalo);
        //    observer.error("auxilio");
        // }
      }, 1000);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
