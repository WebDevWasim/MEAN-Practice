import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  public message: string;
  public isRegistered: boolean;
  public isNotRegistered: boolean;
  public loading = false;
  public file: File;

  profilephoto(event) {
    // getting uploaded files details
    this.file = event.target.files[0];
  }

  submitForm(ref) {
    // create new fromData
    let formData = new FormData();

    // Append profile photo data
    formData.append("photo", this.file, this.file.name);

    // Append registration form details
    let userObj = ref.value;
    formData.append("userObj", JSON.stringify(userObj));
    console.log(formData);
    this.loading = true;
    this.http.post("user/register", formData).subscribe(res => {
      this.loading = false;
      this.message = res["message"];

      // TODO: Exam
      this.isNotRegistered = res["isNotRegistered"];
      this.isRegistered = res["isRegistered"];

      if (this.isNotRegistered == true) {
        ref.reset();
      }
      if (this.isRegistered == true) {
        // TODO: Click a button to redirect to login
        this.router.navigate["login"];
        // alert(res["message"]);
      }

      // TODO: Showing success or exist user message
      setTimeout(() => {
        this.isNotRegistered = false;
        this.isRegistered = false;
      }, 3000);
    });
  }

  ngOnInit() {}
}
