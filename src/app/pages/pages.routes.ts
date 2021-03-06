import { Graficas1Component } from "./graficas1/graficas1.component";
import { ProgressComponent } from "./progress/progress.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from "./pages.component";
import { RouterModule, Routes } from "@angular/router";
import { AccountSettingsComponent } from "../components/account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { LoginGuardGuard } from './../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';

const pagesRoutes: Routes = [
  {
    path: "",
    canActivate: [LoginGuardGuard],
    component: PagesComponent,
    children: [
      { path: "dashboard", component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: "progress", component: ProgressComponent, data: { titulo: 'Progress' } },
      { path: "graficas1", component: Graficas1Component, data: { titulo: 'Graficas' } },
      { path: "account-settings", component: AccountSettingsComponent, data: { titulo: 'Account Settings' } },
      { path: "profile", component: ProfileComponent, data: { titulo: 'Perfil' } },
      { path: "promesas", component: PromesasComponent, data: { titulo: 'Promesas' } },
      { path: "rxjs", component: RxjsComponent, data: { titulo: 'RXJS' } },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    ],
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
