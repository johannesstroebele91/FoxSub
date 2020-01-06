import {RouterModule, Routes} from '@angular/router';

import { NgModule } from '@angular/core';
import {SubscriptionListComponent} from "./subscriptions/list/subscription-list.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'subscriptions', component: SubscriptionListComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
