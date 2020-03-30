import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Router,ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

addForm: FormGroup;
submitted = false;
loading = false;
datevalue : any;
 roleName: string;
 itemid;
users :any;

//res: any;
  constructor(
	  private formBuilder: FormBuilder,
	  private router: Router,
	  private dataService: DataService,
	  private http: Http,
	  private route: ActivatedRoute
	  ) 
  {}
	  
	  
  

  ngOnInit() {
    this.itemid = this.route.snapshot.paramMap.get("id")
  
	   var data1= this.getdatevalue();
	  this.addForm = this.formBuilder.group({
	    id:[this.itemid],
		fullname: ['', Validators.required],
		phone: ['', Validators.required],
		email: ['', [Validators.required,Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],	
		role:[this.roleName],
		date :[ data1]
	});
	 this.dataService.getUsersid(this.itemid).subscribe((data:any) => {
	 //console.log(data[0]);
	 this.users = data[0];
    });
		  
  }
  
  get fval() { return this.addForm.controls; }
  changerole(e) {
    this.roleName=e.target.value;	
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




UpdateUser(){
	
	this.submitted = true;
	// return for here if form is invalid
	if (this.addForm.invalid) {
	return;
	}
	this.loading = true;
	this.dataService.Updateuser(this.addForm.value).subscribe(
	(data)=>{	
	this.router.navigate(['user']);
	},
	(error)=>{
	
	this.loading = false;
	}
	)
} 
	
  // UpdateUser(user: User) 
  // {
	// this.http.post('/api/UpdateUser', { 'Usedata':user}).subscribe(res => { this._dataService.getUsers().subscribe(res => this.users = res); }, (err) => { console.log(err);});
	
    // this._dataService.getUsers().subscribe(res => this.users = res);	  
  // }


}
