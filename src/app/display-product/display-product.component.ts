import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { NotifierService } from "angular-notifier";


@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit {
private  notifier: NotifierService;

products: Product;
cdate;
datevalue ;

  constructor(	
    notifier: NotifierService,
	  private router: Router,
	  private http:Http,
	  private _dataService: DataService
	  ) {
	  this.notifier = notifier;
	  	 this._dataService.getProducts().subscribe(res => this.products = res);
	  }

     addtocart(item: Product): void 
	 {
		this.cdate = this.getdatevalue();
		this.http.post("/api/addtoCart",{'ProductID':item.Id, 'CreatedDate': this.cdate})
		.subscribe(res => {this._dataService.getProducts()
			.subscribe(res => this.products = res);},  (err) => { console.log(err); });
			
		this.notifier.notify("success", "Items is added in you cart");
    
     }
	 
  	   
	   
	   getdatevalue()
	{
		var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!

	var yyyy = today.getFullYear();
	
	 var mm1 :string | number = mm;
	 var dd1 :string | number = dd;
	
	if (dd < 10) {
	 dd1 = '0' + dd;
	} 
	if (mm < 10) {
	 mm1 = '0' + mm;
	} 
	var today1 = dd1 + '-' + mm1 + '-' + yyyy;
	  this.datevalue= today1 ;
	return this.datevalue;
  } 
	 
	 

  ngOnInit() {
  }

}
