import {RouterModule, Routes} from '@angular/router';

import { NgModule } from '@angular/core';
import {SubscriptionListComponent} from "./subscriptions/list/subscription-list.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'subscriptions-list', component: SubscriptionListComponent},
    { path: '', component: DashboardComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
