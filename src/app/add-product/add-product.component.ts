import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import {FileUploader,FileSelectDirective } from 'ng2-file-upload';
import { Http, Headers, RequestOptions } from '@angular/http';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

addProduct: FormGroup;
submitted = false;
loading = false;
datevalue : any;
reader:any;

 @ViewChild('fileInput',{static: true}) fileInput: ElementRef;
  constructor( private formBuilder: FormBuilder,
	  private router: Router,
	  private dataService: DataService,
	  private http:Http) { }

  ngOnInit() {
	  
	   var data1= this.getdatevalue();
	  this.addProduct = this.formBuilder.group({
		Name: ['', Validators.required],
		Price: ['', [Validators.required]],
		ImgName: ['',Validators.required],	
		Description: ['', Validators.required],			
		Createddate:[data1],
		CategoryId :[1]
	});
	  
  }
  
  
  onFileChange(event){
    this.reader= new FileReader();
    if (event.target.files && event.target.files.length>0)
    {
      let file=event.target.files[0];
      this.reader.readAsDataURL(file);
      this.reader.onload=()=>{
        this.addProduct.get('ImgName').setValue({
          filename:file.name,
          filetype:file.type,
          value:this.reader.result.split(',')[1]

        }) 
      };
    }

  }
  
  
  
  
  get fval() { return this.addProduct.controls; }
  
  onFormSubmit(){
	  //alert("hello");
	  const formModel= this.addProduct.value;  
	this.submitted = true;
	// return for here if form is invalid
	if (this.addProduct.invalid) {
	return;
	}
	this.loading = true;
	alert("hello");
	 this.http.post('/api/addProduct',{'data':formModel})
      .subscribe(res=>console.log('Done'));
     // console.log(formModel);
	 this.router.navigate(['products']);
      //alert('done');
     this.loading=false;

	
	// this.dataService.Insertproduct(this.addProduct.value).subscribe(
	// (data)=>{
	// //alert('User Registered successfully!!');
	// this.router.navigate(['products']);
	// },
	// (error)=>{
	// //this.toastr.error(error.error.message, 'Error');
	// this.loading = false;
	// }
	// )
 
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
