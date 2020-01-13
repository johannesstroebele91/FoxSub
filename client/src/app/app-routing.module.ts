import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { DashboardComponent} from "./dashboard/dashboard.component";
import { RowComponent } from "./row/row.component";
import { SubscriptionListComponent } from "./subscriptions/list/subscription-list.component";
import { SubscriptionAddComponent } from './subscriptions/subscription-add/subscription-add.component';
import { SubscriptionEditComponent } from './subscriptions/subscription-edit/subscription-edit.component';

// TODO: opt. lazy loading einbauen
const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'row', component: RowComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'subscriptions', children: [
            { path: '', component: SubscriptionListComponent },
            { path: 'add', component: SubscriptionAddComponent },
            { path: 'edit', component: SubscriptionEditComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
