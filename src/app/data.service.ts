import { Injectable } from '@angular/core';

import { User } from '../../models/user';
import { Product } from '../../models/product';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {

result:any;
data;
islogin:any;

  constructor(private http: Http) { }
  register(user: User) {
  
	return this.http.post('/api/registerUser', user);
	}
	
   getUsers() {
    return this.http.get("/api/users")
      .map(result => this.result = result.json().data);
  }
  
  getUsersid(id) {
    return this.http.post("/api/getuserbyId",{ 'id': id })
      .map(result => this.result = result.json().data);
  }


  Updateuser(user: User) {  
   console.log(user);
  return this.http.post('/api/UpdateUser', user);
	}
  
  getProducts() {
    return this.http.get("/api/Products")
      .map(result => this.result = result.json().data);
  }
  
  getProductid(Id) {
	  return this.http.post("/api/ProductbyId",{ 'Id': Id })
      .map(result => this.result = result.json().data);
  }
  
  Insertproduct(product: Product) {  
	return this.http.post('/api/addProduct', product);
	}
	
  
  UpdatePrduct(product: Product) {  
   console.log(product);
  return this.http.post('/api/UpdateProduct', product);
	}
	
	getCheckout() {
    return this.http.get("/api/checkoutproducts")
      .map(result => this.result = result.json().data);
  }

}
