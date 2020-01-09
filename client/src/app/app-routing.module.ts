import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SubscriptionListComponent} from "./subscriptions/list/subscription-list.component";
import {LoginComponent} from "./login/login.component";
import {SubscriptionAddComponent} from "./subscriptions/subscription-add/subscription-add.component";

// TODO: opt. lazy loading einbauen
const routes: Routes = [
    { path: '', component: LoginComponent},
    // TODO: add dashboard component later
    { path: 'dashboard', component: LoginComponent},
    { path: 'subscriptions', children: [
            {path: '', component: SubscriptionListComponent},
            {path: 'add', component: SubscriptionAddComponent},
            // TODO: add edit component later
            {path: 'edit', component: SubscriptionAddComponent}
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
