import { Routes, RouterModule } from "@angular/router";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';

const adminRouteConfig: Routes = [
    { path: '', component: AdminDashboardComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(adminRouteConfig)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }