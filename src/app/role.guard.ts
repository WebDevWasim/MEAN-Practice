import { Injectable, OnInit } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import decode from "jwt-decode";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class RoleGuard implements CanActivate, OnInit {
  constructor(public auth: AuthService, public router: Router) {}
  ngOnInit() {
    console.log("On Init");
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    // const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem("token");

    // decode the token to get its payload
    const tokenPayload = decode(token);
    // const tokenPayload =

    if (
      !this.auth.isAuthenticated() &&
      tokenPayload.email !== route.paramMap.get("email")
    ) {
      alert("RoleGuard: Please Login to acccess this page...");
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
