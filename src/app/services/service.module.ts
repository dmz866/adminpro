import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  SettingsService,
  SharedService,
  SidebarService,
} from "./service.index";
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';


@NgModule({
  declarations: [],
  imports: [CommonModule,
    HttpClientModule],
  providers: [SettingsService, SharedService, SidebarService, LoginGuardGuard],
})
export class ServiceModule {}
