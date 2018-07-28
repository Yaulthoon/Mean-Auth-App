import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { AuthService } from '../../services/auth.service'
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  errorMessage: String;

  constructor(private router: Router, private validateService: ValidateService, private authService: AuthService) { }

  ngOnInit() {
	  console.log(this.authService);
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };
	
	if(!this.validateService.validateRegister(user)){
      this.errorMessage = 'Please fill in all fields';
	   setTimeout(() => {
		  this.errorMessage = '';
		  console.log('changed');
	  }, 3000);
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.errorMessage = 'Please use a valid email';
	   setTimeout(() => {
		  this.errorMessage = '';
		  console.log('changed');
	  }, 3000);
      return false;
    }
	
	this.authService.registerUser(user).subscribe(data => {
      if(data.success){
         this.errorMessage = 'User registered';
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Something went wrong';
        this.router.navigate(['/register']);
      }
    });
  
  }
  

}
