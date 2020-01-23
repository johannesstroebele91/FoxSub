import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubscriptionListComponent} from "./subscriptions/list/subscription-list.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { RowComponent } from "./row/row.component";
import { SubscriptionChangeComponent } from './subscriptions/subscription-change/subscription-change.component';
import { SubscriptionResolver} from "./SubscriptionResolver";

// TODO: opt. lazy loading einbauen
const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'subscriptions-list', component: SubscriptionListComponent},
    { path: '', component: DashboardComponent},
    { path: 'login', component: LoginComponent },
    { path: 'row', component: RowComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'subscriptions', children: [
            { path: '', pathMatch: "full", component: SubscriptionListComponent },
            { path: 'add', component: SubscriptionChangeComponent },
            { path: 'edit/:uuid', component: SubscriptionChangeComponent, resolve: {subscriptions: SubscriptionResolver } }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
