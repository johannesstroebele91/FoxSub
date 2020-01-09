import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RowComponent } from "./row/row.component";
import { ProfileComponent } from "./profile/profile.component";
import { SubscriptionListComponent } from './subscriptions/list/subscription-list.component';
import { HeaderComponent} from "./header/header.component";
import {ReactiveFormsModule} from "@angular/forms";

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
    SubscriptionListComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
