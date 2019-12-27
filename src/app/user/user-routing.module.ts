import { UserprofileComponent } from "./userprofile/userprofile.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserdashboardComponent } from "./userdashboard/userdashboard.component";
import { ProtectrouteGuard } from "../protectroute.guard";
import { RoleGuard } from "../role.guard";

const routes: Routes = [
  {
    path: "userdashboard/:email",
    component: UserdashboardComponent,
    canActivate: [RoleGuard],
    children: [
      {
        path: "profile",
        component: UserprofileComponent,
        // canActivate: [ProtectrouteGuard],
        canActivate: [RoleGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
