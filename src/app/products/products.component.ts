import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

products: Array<any>;
private readonly notifier: NotifierService;
 constructor(	 
      notifierService: NotifierService,
	  private router: Router,
	  private http:Http,
	  private _dataService: DataService
	  ) {
	  this.notifier = notifierService;
	  	 this._dataService.getProducts().subscribe(res => this.products = res);
	  }
 
 
 ngOnInit() {
	 
 } 
  
 
  deleteProduct(product: Product): void {
  console.log(product);
    this.http.post('/api/deleteProduct', { 'Id': product.Id })
	.subscribe(res => { this._dataService.getProducts()
		.subscribe(res => this.products = res); },  (err) => { console.log(err); });
     this._dataService.getProducts().subscribe(res => this.products = res);
  }
  
  editProduct(product: Product): void {
  
	   this.router.navigate(['editproduct', product.Id])
  }
  
  
  addproduct()
  {
	  this.router.navigate(['addproduct']);
  }


}
