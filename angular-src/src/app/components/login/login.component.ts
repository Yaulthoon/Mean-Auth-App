import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  errorMessage: String;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }
  
  onLoginSubmit() {
	  const user = {
		  username: this.username,
		  password: this.password
	  };
	  
	  this.authService.authenticateUser(user).subscribe((data:any) => {
		  if(data.success) {
			  this.authService.storeUserData(data.token, data.user);
			  this.router.navigate(['dashboard']);
			  this.errorMessage = 'You have logged in successfully';
			  setTimeout(() => {
				  this.errorMessage = '';
			  }, 3000);
		  } else {
			  this.errorMessage = "Failed login";
			  setTimeout(() => {
				  this.errorMessage = '';
			  }, 3000);
		  }
	  });
	  
  }

}
