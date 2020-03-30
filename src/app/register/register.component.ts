import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
	  private formBuilder: FormBuilder,
	  private router: Router,
	  private dataService: DataService
	 
	  ) { }
	  
registerForm: FormGroup;
loading = false;
submitted = false;
datevalue : any;

  ngOnInit() {
   var data1= this.getdatevalue();
	  this.registerForm = this.formBuilder.group({
		fullname: ['', Validators.required],
		phone: ['', Validators.required],
		email: ['', [Validators.required,Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],
		confirmPassword : ['', Validators.required],
		role:['user'],
		date :[ data1]
		 }, {
            validator: this.MustMatch('password', 'confirmPassword')
	});
	}

get fval() { return this.registerForm.controls; }

onFormSubmit(){
	alert("hello");
	this.submitted = true;
// return for here if form is invalid
	if (this.registerForm.invalid) {
	return;
	}
	this.loading = true;
	this.dataService.register(this.registerForm.value).subscribe(
	(data)=>{
	alert('User Registered successfully!!');
	this.router.navigate(['login']);
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

     var mm1 :string | number = mm;
	 var dd1 :string | number = dd;
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
  
  
  // custom validator to check that two fields match
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
  
  

}
