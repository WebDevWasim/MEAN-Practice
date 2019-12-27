import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor() {}
  // ...
  public isAuthenticated(): boolean {
    let token = localStorage.getItem("token");
    let expTime = +localStorage.getItem("expTime");
    let time = Date.now() / 1000;
    if (token && expTime) {
      if (time > expTime) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }
}
