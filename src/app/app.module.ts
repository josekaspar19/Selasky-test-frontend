import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { AddOrderComponent } from './components/order/add-order/add-order.component';
import { EditOrderComponent } from './components/order/edit-order/edit-order.component';
import { ListOrderComponent } from './components/order/list-order/list-order.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    AddOrderComponent,
    EditOrderComponent,
    ListOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
