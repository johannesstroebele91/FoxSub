import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent} from "./header/header.component";
import { SubscriptionListComponent } from './subscriptions/list/subscription-list.component';
import { SubscriptionListElementComponent} from "./subscriptions/list/expansion/subscription-list-element.component";
import { SubscriptionAddComponent } from './subscriptions/subscription-add/subscription-add.component';
import { SubscriptionEditComponent } from './subscriptions/subscription-edit/subscription-edit.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
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
