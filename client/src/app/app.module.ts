import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from "./profile/profile.component";
import { RowComponent } from "./row/row.component";
import { SubscriptionListElementComponent } from "./subscriptions/list/expansion/subscription-list-element.component";
import { SubscriptionListComponent } from './subscriptions/list/subscription-list.component';
import { SubscriptionAddComponent } from './subscriptions/subscription-add/subscription-add.component';
import { SubscriptionEditComponent } from './subscriptions/subscription-edit/subscription-edit.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    ProfileComponent,
    RowComponent,
    HeaderComponent,
    SubscriptionListComponent,
    SubscriptionListElementComponent,
    SubscriptionAddComponent,
    SubscriptionEditComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
