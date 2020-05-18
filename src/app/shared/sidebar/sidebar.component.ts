import { Component, OnInit } from "@angular/core";
import { SidebarService } from "./../../services/shared/sidebar.service";
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: [],
})
export class SidebarComponent implements OnInit {
  menus: any;
  constructor(private sidebarService: SidebarService, private usuarioService: UsuarioService) {}

  logout() {
    this.usuarioService.logout();
  }

  ngOnInit() {
    this.menus = this.sidebarService.getMenuList();
  }
}
