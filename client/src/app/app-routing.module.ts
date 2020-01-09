import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "./login/login.component";
import {SubscriptionListComponent} from "./subscriptions/list/subscription-list.component";
import {SubscriptionAddComponent} from "./subscriptions/subscription-add/subscription-add.component";
import {SubscriptionEditComponent} from "./subscriptions/subscription-edit/subscription-edit.component";

// TODO: opt. lazy loading einbauen
const routes: Routes = [
    { path: '', component: LoginComponent},
    // TODO: add dashboard component later
    { path: 'dashboard', component: LoginComponent},
    { path: 'subscriptions', children: [
            {path: '', component: SubscriptionListComponent},
            {path: 'add', component: SubscriptionAddComponent},
            {path: 'edit', component: SubscriptionEditComponent}
    ]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
