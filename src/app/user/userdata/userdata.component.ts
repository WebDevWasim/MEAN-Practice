import { HttpClient } from "@angular/common/http";
import { UserdataService } from "./../../userdata.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-userdata",
  templateUrl: "./userdata.component.html",
  styleUrls: ["./userdata.component.css"]
})
export class UserdataComponent implements OnInit {
  constructor(private httpservice: UserdataService, private http: HttpClient) {}
  public userData = [];
  public loading = false;
  public nameField;
  public emailField;
  public mobileField;
  public qualificationField;

  public retriveData = () => {
    this.loading = true;
    this.httpservice.getUserData().subscribe(data => {
      this.loading = false;

      this.userData = data["dataArray"];
      console.log(this.userData);
    });
  };
  ngOnInit() {
    this.loading = true;
    this.retriveData();
  }
  deleteUser(useremail) {
    this.loading = true;
    this.http.delete(`admin/users/${useremail}`).subscribe(res => {
      this.loading = false;

      this.retriveData();
      console.log(res["message"]);
    });
  }

  editUser(useremail) {
    this.loading = true;
    this.http.get(`admin/users/${useremail}`).subscribe(res => {
      this.loading = false;

      // console.log(res["userObj"].email);
      this.nameField = res["userObj"].name;
      this.emailField = res["userObj"].email;
      this.mobileField = res["userObj"].mobile;
      this.qualificationField = res["userObj"].qualification;
    });
  }

  updateUser(data) {
    this.loading = true;
    this.http.put(`admin/update/${this.emailField}`, data).subscribe(res => {
      this.loading = false;

      this.retriveData();
      // console.log(res["message"]);
    });
  }
}
