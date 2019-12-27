import { Component, OnInit } from "@angular/core";
import { LoginService } from "../login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  public admin = "admin";

  ngOnInit() {
    setTimeout(() => {
      this.loginService.logout();
    }, 0);
  }
  public loading = false;
  onLogin(data) {
    this.loading = true;
    this.loginService.login(data.value).subscribe(res => {
      this.loading = false;
      if (res["message"] == "Logged in successfully") {
        alert(res["message"]);
        localStorage.setItem("token", res["token"]);
        // localStorage.setItem("email", res["email"]);
        localStorage.setItem("expTime", res["expTime"]);
        this.router.navigate(["userdashboard", res["email"]]);
      } else if (res["message"] == "Admin login Successfully") {
        alert(res["message"]);
        localStorage.setItem("token", res["token"]);
        localStorage.setItem("expTime", res["expTime"]);
        // localStorage.setItem("email", res["email"]);
        this.router.navigate(["admindashboard", res["email"]]);
      } else {
        alert(res["message"]);
      }
    });
  }
}
