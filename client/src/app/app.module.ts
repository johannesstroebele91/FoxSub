import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent} from "./header/header.component";
import { SubscriptionListComponent } from './subscriptions/list/subscription-list.component';
import { SubscriptionListElementComponent} from "./subscriptions/list/expansion/subscription-list-element.component";
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SubscriptionListComponent,
    SubscriptionListElementComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
