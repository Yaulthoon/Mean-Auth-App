import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Object;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
	  this.authService.getProfile().subscribe((profile:any) => {
		  this.user = profile.user;
		  console.log(profile.user);
	  },
	  err => {
		  console.log(err);
		  return false;
	  });
  }

}
