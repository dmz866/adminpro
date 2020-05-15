import { Component, OnInit } from "@angular/core";
import { SettingsService } from "src/app/services/settings/settings.service";
import { Ajustes } from "./../../interfaces/interfaces";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrls: ["./account-settings.component.css"],
})
export class AccountSettingsComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    const ajustes = this.settingsService.getAjustes();
    this.colocarCheck(ajustes.tema);
  }

  cambiarColor(tema: string, link: any) {
    this.aplicarCheck(link);
    this.settingsService.aplicarAjustes(tema);
  }

  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName("selector");
    for (const selector of selectores) {
      selector.classList.remove("working");
    }

    link.classList.add("working");
  }

  colocarCheck(tema: string) {
    const selectores: any = document.getElementsByClassName("selector");
    for (const selector of selectores) {
      if (selector.getAttribute("data-theme") === tema) {
        selector.classList.add("working");
        break;
      }
    }
  }
}
