import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserRoutingModule } from "./user-routing.module";

import { UserdataComponent } from "./userdata/userdata.component";
import { UserdashboardComponent } from "./userdashboard/userdashboard.component";
import { UserprofileComponent } from "./userprofile/userprofile.component";

import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";

@NgModule({
  declarations: [
    UserdataComponent,
    UserdashboardComponent,
    UserprofileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: "rgba(0,0,0,0.3)",
      fullScreenBackdrop: true,
      primaryColour: "#fff",
      secondaryColour: "#fff",
      tertiaryColour: "#fff"
    })
  ]
})
export class UserModule {}
