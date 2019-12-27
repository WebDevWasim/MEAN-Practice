import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from "@angular/router";

@Component({
  selector: "app-userprofile",
  templateUrl: "./userprofile.component.html",
  styleUrls: ["./userprofile.component.css"]
})
export class UserprofileComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private activateRoute: ActivatedRoute
  ) {}
  public userProfileObj = {};
  private email: string;
  public loading = false;
  public loadProfile() {
    // let email = localStorage.getItem("email");
    this.loading = true;
    this.http.get<object>(`user/${this.email}/profile`).subscribe(res => {
      this.loading = false;

      if (res["message"] == "Please Re-Login...") {
        alert("Please Re-Login...");
        this.router.navigate(["login"]);
      } else {
        this.userProfileObj = res["message"];
      }
    });
  }
  ngOnInit() {
    // this.activateRoute.parent.params.subscribe(params => {
    this.email = this.activateRoute.snapshot.parent.paramMap.get("email");
    console.log("profile", this.email);

    // });
    this.loadProfile();
  }

  public file: File;

  profilephoto(event) {
    // getting uploaded files details
    this.file = event.target.files[0];
    let formData = new FormData();
    formData.append("photo", this.file, this.file.name);
    formData.append("userObj", JSON.stringify(this.userProfileObj));
    console.log(this.userProfileObj["email"]);
    this.loading = true;
    this.http.put("user/profile/update", formData).subscribe(res => {
      console.log(res["message"]);
      this.loadProfile();
    });
  }
}
