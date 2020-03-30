import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-listof-users',
  templateUrl: './listof-users.component.html',
  styleUrls: ['./listof-users.component.css']
})
export class ListofUsersComponent implements OnInit {
users: Array<any>;

  constructor(	  
	  private router: Router,
	  private http:Http,
	  private _dataService: DataService
	  ) {
	  	 this._dataService.getUsers().subscribe(res => this.users = res);
	  }

  ngOnInit() {
	  
	  
  }
  
  deleteUser(user: User): void {
  console.log(user);
    this.http.post('/api/deletedata', { 'id': user.Id })
	.subscribe(res => { this._dataService.getUsers()
		.subscribe(res => this.users = res); },  (err) => { console.log(err); });
     this._dataService.getUsers().subscribe(res => this.users = res);
  }
  
  editUser(user: User): void {
  
	   this.router.navigate(['edituser', user.Id])
  }
  
  
  addUser()
  {
	  this.router.navigate(['adduser']);
	}

}
