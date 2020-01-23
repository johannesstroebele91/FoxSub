import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HttpClientTestingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TestHelperModule { }
