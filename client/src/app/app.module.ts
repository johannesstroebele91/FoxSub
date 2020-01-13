import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent} from "./header/header.component";
import { SubscriptionListComponent } from './subscriptions/list/subscription-list.component';
import { SubscriptionListElementComponent} from "./subscriptions/list/expansion/subscription-list-element.component";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from "@angular/forms";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SubscriptionListComponent,
    SubscriptionListElementComponent,
    LoginComponent,
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
