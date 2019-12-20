import {RouterModule, Routes} from '@angular/router';

import { TestComponent } from './test.component';
import { NgModule } from '@angular/core';
import { Test2Component } from './test2.component';
import {ProfileComponent} from "./profile/profile.component";
import {RowComponent} from "./row/row.component";

const routes: Routes = [
    { path: '', component: Test2Component},
    { path: 't2', component: TestComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'row', component: RowComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}