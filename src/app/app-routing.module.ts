import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "", redirectTo: "register", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "aboutus", component: AboutusComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [];
