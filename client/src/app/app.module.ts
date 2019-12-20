import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './test.component';
import { Test2Component } from './test2.component';
import { RowComponent } from "./row/row.component";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    TestComponent,
    Test2Component,
    ProfileComponent,
    RowComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
