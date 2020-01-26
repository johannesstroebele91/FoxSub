import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent} from "./header/header.component";
import { SubscriptionListComponent } from './subscriptions/list/subscription-list.component';
import { SubscriptionListElementComponent} from "./subscriptions/list/element/subscription-list-element.component";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubscriptionChangeComponent } from './subscriptions/subscription-change/subscription-change.component';
import { ProfileComponent} from "./profile/profile.component";
import { RowComponent} from "./row/row.component";
import { ErrorInterceptor } from "../shared/interceptors/ErrorInterceptor";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        FormsModule
    ],
  declarations: [
    AppComponent,
    ProfileComponent,
    RowComponent,
    HeaderComponent,
    DashboardComponent,
    SubscriptionListComponent,
    SubscriptionListElementComponent,
    SubscriptionChangeComponent,
    LoginComponent,
    DashboardComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
