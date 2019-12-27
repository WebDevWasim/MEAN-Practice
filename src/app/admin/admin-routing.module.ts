import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserdataComponent } from "../user/userdata/userdata.component";
import { ProtectrouteGuard } from "../protectroute.guard";

const routes: Routes = [
  {
    path: "admindashboard/:email",
    component: AdmindashboardComponent,
    canActivate: [ProtectrouteGuard],
    children: [
      {
        path: "users",
        component: UserdataComponent,
        canActivate: [ProtectrouteGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
