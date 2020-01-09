import {RouterModule, Routes} from '@angular/router';

import { NgModule } from '@angular/core';
import {ProfileComponent} from "./profile/profile.component";
import {SubscriptionListComponent} from "./subscriptions/list/subscription-list.component";
import {LoginComponent} from "./login/login.component";

import {RowComponent} from "./row/row.component";
const routes: Routes = [
    { path: '', component: ProfileComponent},
    { path: 'row', component: RowComponent},
    { path: 'subscription-list', component: SubscriptionListComponent},
    { path: 'login', component: LoginComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
