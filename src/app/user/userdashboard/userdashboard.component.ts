import { LoginService } from "./../../login.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";

@Component({
  selector: "app-userdashboard",
  templateUrl: "./userdashboard.component.html",
  styleUrls: ["./userdashboard.component.css"]
})
export class UserdashboardComponent implements OnInit {
  public param: ActivatedRouteSnapshot;
  constructor(
    private loginService: LoginService
  ) // private activeRoute: ActivatedRoute
  {}
  logOut() {
    this.loginService.logout();
  }
  ngOnInit() {
    // this.param = this.activeRoute.snapshot.params.email;
    // console.log("userdashboard", this.param);
  }
}
