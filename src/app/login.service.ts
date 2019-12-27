import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}
  // TODO: Login user / admin
  login(data): Observable<any> {
    let loginAs = data.logAs;
    return this.http.post<any>(`/${loginAs}/login`, data);
  }

  // TODO: Logout user / admin
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("expTime");
    this.router.navigate(["login"]);
  }

  // Get login status of user/admin
  isUserLoggedIn() {
    let email = localStorage.getItem("email");
    if (email == null) {
      return false;
    } else if (email == "admin") {
      return false;
    } else {
      return true;
    }
  }

  isAdminLoggedIn() {
    let email = localStorage.getItem("email");
    if (email == "admin") {
      return true;
    }
  }
}
