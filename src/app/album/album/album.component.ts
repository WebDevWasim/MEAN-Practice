import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.css"]
})
export class AlbumComponent implements OnInit {
  constructor(private http: HttpClient) {}
  public photos = [];
  public loading = false;
  public loadAlbum() {
    this.loading = true;
    this.http.get<object>("album/photos").subscribe(res => {
      this.loading = false;
      console.log(res["message"]);
      this.photos = res["url"];
      console.log(this.photos);
    });
  }

  ngOnInit() {
    this.loadAlbum();
  }

  public file: File;

  uploadPhoto(event) {
    this.file = event.target.files[0];
    let formData = new FormData();
    formData.append("album", this.file, this.file.name);
    this.loading = true;
    this.http.post("album/upload", formData).subscribe(res => {
      console.log(res["message"]);
      this.loadAlbum();
    });
  }
}
