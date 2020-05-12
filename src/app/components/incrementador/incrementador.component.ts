import {
  EventEmitter,
  Component,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styleUrls: ["./incrementador.component.css"],
})
export class IncrementadorComponent implements OnInit {
  @ViewChild("progresoInput") progresoInput: ElementRef;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter<number>();
  progreso: number = 50;
  leyenda: string = "";

  constructor() {}

  ngOnInit() {}

  onChange(newValue: number) {
    if (newValue >= 100) {
      newValue = 100;
    }

    if (!newValue || newValue <= 0) {
      newValue = 0;
    }

    this.progreso = newValue;
    this.progresoInput.nativeElement = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor) {
    this.progreso = this.progreso + valor;
    this.cambioValor.emit(this.progreso);
    this.progresoInput.nativeElement.focus();
  }
}
