import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

products: Product;
//getTotal:any;

   constructor(	  
	  private router: Router,
	  private http:Http,
	  private _dataService: DataService
	  ) {
	  	 this._dataService.getCheckout().subscribe(res => this.products = res);
	  }
	  
	RemoveItem(product: Product): void {
		 // console.log(product);
    this.http.post('/api/deletecheckout', { 'Id': product.Id })
	.subscribe(res => { this._dataService.getCheckout()
		.subscribe(res => this.products = res); },  (err) => { console.log(err); });
     this._dataService.getCheckout().subscribe(res => this.products = res);
  }
	  
  
   getTotal = function(){
   //console.log(this.products);
    var total = 0;
    for(let productitems of this.products ){       
		//console.log(productitems);
        total += (productitems.Price * productitems.quantity );
    }
    return total;
   }
   
  QChanged(product:Product, $event): void {
		  console.log($event);
		//console.log($event.target.value);
		var qt = $event;
	 this.http.post('/api/Updatecheckout', { 'Quty': qt, 'data':product })
	.subscribe(res => { this._dataService.getCheckout()
		.subscribe(res => this.products = res); },  (err) => { console.log(err); });
     this._dataService.getCheckout().subscribe(res => this.products = res);
  }
	
	
	
	



  ngOnInit() {
  }

}
