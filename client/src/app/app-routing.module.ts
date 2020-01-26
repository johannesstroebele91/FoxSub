import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SubscriptionListComponent} from "./subscriptions/list/subscription-list.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { RowComponent } from "./row/row.component";
import { SubscriptionChangeComponent } from './subscriptions/subscription-change/subscription-change.component';
import { SubscriptionResolver} from "../shared/resolver/subscription.resolver";
import {ServicesResolver} from "../shared/resolver/services.resolver";
import {UserResolver} from "../shared/resolver/user.resolver";
import {CategoryResolver} from "../shared/resolver/category.resolver";

// TODO: opt. lazy loading einbauen
const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'subscriptions-list', component: SubscriptionListComponent},
    { path: 'login', component: LoginComponent },
    { path: 'row', component: RowComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'dashboard', pathMatch: "full", component: DashboardComponent, resolve: {
            user: UserResolver,
            categories: CategoryResolver
        } },
    { path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'subscriptions', children: [
            { path: '', pathMatch: "full", component: SubscriptionListComponent },
            { path: 'add', component: SubscriptionChangeComponent, resolve: {
                services: ServicesResolver
                } },
            { path: 'edit/:uuid', component: SubscriptionChangeComponent, resolve: {
                subscription: SubscriptionResolver,
                services: ServicesResolver
                } }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
