import { PagesModule } from "./pages/pages.module";
import { APP_ROUTES } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { FormsModule } from "@angular/forms";
import { ServiceModule } from "./services/service.module";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, APP_ROUTES, PagesModule, FormsModule, ServiceModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
