import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SubscriptionListComponent} from "./subscriptions/list/subscription-list.component";
import {LoginComponent} from "./login/login.component";
import {SubscriptionAddComponent} from "./subscriptions/subscription-add/subscription-add.component";

const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'subscriptions', component: SubscriptionListComponent},
    { path: 'subscription-add', component: SubscriptionAddComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
