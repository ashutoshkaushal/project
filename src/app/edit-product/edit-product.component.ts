import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Router,ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import {FileUploader,FileSelectDirective } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {


addProduct: FormGroup;
submitted = false;
loading = false;
datevalue : any;
reader:any;
products :any;
itemid ;

 @ViewChild('fileInput',{static: true}) fileInput: ElementRef;
  constructor(
	   private formBuilder: FormBuilder,
	  private router: Router,
	  private dataService: DataService,
	  private http: Http,
	  private route: ActivatedRoute
	  
	  ) { }

  ngOnInit() {
	   this.itemid = this.route.snapshot.paramMap.get("Id") ;
	    var data1= this.getdatevalue();
	  this.addProduct = this.formBuilder.group({
		Id:[this.itemid],
		Name: ['', Validators.required],
		Price: ['', [Validators.required]],
		ImgName: [''],	
		Description: ['', Validators.required],			
		Createddate:[data1],
		CategoryId :[1]
	})
	
	this.dataService.getProductid(this.itemid).subscribe((data:any) => {
	 //console.log(data[0]);
	 this.products = data[0];
	}) 
  }
  
  get fval() { return this.addProduct.controls; }
  
  
  
    onFileChange($event){
    this.reader= new FileReader();
    if ($event.target.files && $event.target.files.length>0)
    {
       let file=$event.target.files[0];
       this.reader.readAsDataURL(file);
       this.reader.onload=()=>{
	   
	  
		 // this.addProduct.controls['ImgName'].setValue({value:this.reader.result.split(',')[1]});
	   
         this.addProduct.get('ImgName').setValue({
           filename:file.name,
           filetype:file.type,
           value:this.reader.result.split(',')[1]	  
        }) 

      };
    }

  }
  
  
  onFormSubmit(){
	  //alert("hello");
	  const formModel= this.addProduct.value;  
	this.submitted = true;
	// return for here if form is invalid
	if (this.addProduct.invalid) {
	return;
	}
	this.loading = true;
	//alert("hello");
	 this.http.post('/api/updateProduct',{'data':formModel})
      .subscribe(res=>console.log('Done'));
     // console.log(formModel);
      //alert('done');
	  this.router.navigate(['products']);
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


  
  

}



 
