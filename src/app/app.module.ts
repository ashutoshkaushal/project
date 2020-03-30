import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Component,OnInit, ElementRef, ViewChild , ViewEncapsulation} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';	
import { FileSelectDirective } from 'ng2-file-upload';

import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderdataComponent } from './headerdata/headerdata.component';
import { DataService } from './data.service';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.component';
import { DashboarddataComponent } from './dashboarddata/dashboarddata.component';
import { ListofUsersComponent } from './listof-users/listof-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DisplayProductComponent } from './display-product/display-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NotifierModule } from "angular-notifier";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HeaderdataComponent,
    ProductsComponent,
    AdminComponent,
    DashboarddataComponent,
    ListofUsersComponent,
    EditUserComponent,
    AddUserComponent,
    EditProductComponent,
    AddProductComponent,
   FileSelectDirective,
   DisplayProductComponent,
   CheckoutComponent
	
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,	
	HttpModule,
	NotifierModule,
	ReactiveFormsModule,
	FormsModule,
	RouterModule.forRoot([
      {
        path: '',
        component : HeaderdataComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'login',
        component : LoginComponent
      }
    ]),
		RouterModule.forRoot([
      {
        path: 'register',
        component : RegisterComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'home',
        component : HeaderdataComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'admin',
        component : AdminComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'user',
        component : ListofUsersComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'products',
        component : ProductsComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'logout',
        component : HeaderdataComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'adduser',
        component : AddUserComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'edituser/:id',
        component : EditUserComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'addproduct',
        component : AddProductComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'editproduct/:Id',
        component : EditProductComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'ListProducts',
        component : DisplayProductComponent
      }
    ]),
	RouterModule.forRoot([
      {
        path: 'checkout',
        component : CheckoutComponent
      }
    ]),
	
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
