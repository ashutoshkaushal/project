import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

users: Array<any>;
  createuser:Array<any>;
  uname;
  pass;
  msgg;
  role;

  constructor(
	    private router: Router,
		private http:Http
	  ) { }

  check()
  {
  
    this.http.post('/api/check', {'uname':this.uname,'pass':this.pass}).subscribe(res =>{ 
	this.msgg = JSON.parse(res.text());
	if( this.msgg.msg == "valid" ){
		this.role = this.msgg.data[0].Role;
	 console.log(this.msgg.data);
		alert(this.role);
		if( this.role == 'user' ){
			this.router.navigate(['']);
		}else if( this.role == 'admin' ){
			this.router.navigate(['/admin']);
		}
	}
	
	});
  
  }

  ngOnInit() {
  }

}
