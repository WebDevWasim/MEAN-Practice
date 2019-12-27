import { AdminModule } from "./admin/admin.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { UserModule } from "./user/user.module";
import { AuthorizationService } from "./authorization.service";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { AlbumModule } from "./album/album.module";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HomeComponent,
    AboutusComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    UserModule,
    AdminModule,
    AlbumModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: "rgba(0,0,0,0.4)",
      fullScreenBackdrop: true,
      primaryColour: "#fff",
      secondaryColour: "#fff",
      tertiaryColour: "#fff"
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
