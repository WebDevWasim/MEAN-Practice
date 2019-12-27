import { LoginService } from "./../../login.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admindashboard",
  templateUrl: "./admindashboard.component.html",
  styleUrls: ["./admindashboard.component.css"]
})
export class AdmindashboardComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  logOut() {
    this.loginService.logout();
  }

  ngOnInit() {}
}
