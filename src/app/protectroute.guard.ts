import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class ProtectrouteGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      alert("Please Login to acccess this page...");
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
