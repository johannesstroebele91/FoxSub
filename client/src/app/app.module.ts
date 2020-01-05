import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SubscriptionListComponent } from './subscriptions/list/subscription-list.component';
import { SubscriptionListElementComponent} from "./subscriptions/list/expansion/subscription-list-element.component";
import { HeaderComponent} from "./header/header.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    SubscriptionListComponent,
    SubscriptionListElementComponent,
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
