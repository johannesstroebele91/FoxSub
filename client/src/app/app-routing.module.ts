import {RouterModule, Routes} from '@angular/router';

import { TestComponent } from './test.component';
import { NgModule } from '@angular/core';
import { Test2Component } from './test2.component';

const routes: Routes = [
    { path: '', component: Test2Component},
    { path: 't2', component: TestComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}