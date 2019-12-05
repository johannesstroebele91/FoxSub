import {RouterModule, Routes} from '@angular/router';

import { NgModule } from '@angular/core';
import {SubscriptionListComponent} from "./subscriptions/list/subscription-list.component";

const routes: Routes = [
    { path: 'subscriptions', component: SubscriptionListComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}