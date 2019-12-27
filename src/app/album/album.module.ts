import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlbumRoutingModule } from "./album-routing.module";
import { AlbumComponent } from "./album/album.component";

import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";

@NgModule({
  declarations: [AlbumComponent],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.doubleBounce,
      backdropBackgroundColour: "rgba(0,0,0,0.3)",
      fullScreenBackdrop: true,
      primaryColour: "#fff",
      secondaryColour: "#fff",
      tertiaryColour: "#fff"
    })
  ]
})
export class AlbumModule {}
