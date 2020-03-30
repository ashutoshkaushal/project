import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
	  
addForm: FormGroup;
submitted = false;
loading = false;
datevalue : any;
 roleName: string;
  constructor( private formBuilder: FormBuilder,
	  private router: Router,
	  private dataService: DataService) { }

  ngOnInit() {
	  
	  var data1= this.getdatevalue();
	  this.addForm = this.formBuilder.group({
		fullname: ['', Validators.required],
		phone: ['', Validators.required],
		email: ['', [Validators.required,Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],	
		role:[this.roleName],
		date :[ data1]
	});
  
  }
  
  // Choose city using select dropdown
  changerole(e) {
    this.roleName=e.target.value;
	alert(this.roleName);
	
	alert (this.getdatevalue());
  }
  
  
  get fval() { return this.addForm.controls; }
  
  
  onFormSubmit(){
	alert("hello");
	this.submitted = true;
	// return for here if form is invalid
	if (this.addForm.invalid) {
	return;
	}
	this.loading = true;
	this.dataService.register(this.addForm.value).subscribe(
	(data)=>{
	//alert('User Registered successfully!!');
	this.router.navigate(['user']);
	},
	(error)=>{
	//this.toastr.error(error.error.message, 'Error');
	this.loading = false;
	}
	)
 
	}
  
  
  
  getdatevalue()
	{
		var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
    console.log(dd);
	let dd1 : string | number = dd ;
	
	let mm1 : string | number = mm ;
	var yyyy = today.getFullYear();
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
  
  
   
  

}
