import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  private menu: any = [
    {
      titulo: "Principal",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: "Dashboard", url: "/dashboard" },
        { titulo: "ProgressBar", url: "/progress" },
        { titulo: "Graficas", url: "/graficas1" },
        { titulo: "Promesas", url: "/promesas" },
        { titulo: "Rxjs", url: "/rxjs" },
      ],
    },
  ];

  getMenuList() {
    return this.menu;
  }

  constructor() {}
}
