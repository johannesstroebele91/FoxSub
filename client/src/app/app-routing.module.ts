import {RouterModule, Routes} from '@angular/router';

import { NgModule } from '@angular/core';
import {ProfileComponent} from "./profile/profile.component";
import {SubscriptionListComponent} from "./subscriptions/list/subscription-list.component";

import {RowComponent} from "./row/row.component";
const routes: Routes = [
    { path: 'profile', component: ProfileComponent},
    { path: 'row', component: RowComponent},
    { path: '', component: SubscriptionListComponent},
    { path: 'subscriptions', component: SubscriptionListComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}