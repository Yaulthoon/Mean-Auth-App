import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

authToken: any;
user: any;
response: any;

	constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

	registerUser(user):any {
		const httpOptions = {
headers: new HttpHeaders({
				'Content-Type':  'application/json'
			})
		};
		return this.http.post('http://localhost:3000/users/register', user, httpOptions);
	}

	authenticateUser(user) {
		const httpOptions = {
headers: new HttpHeaders({
				'Content-Type':  'application/json'
			})
		};
		return this.http.post('http://localhost:3000/users/authenticate', user, httpOptions);
		
	}

	getProfile() {
		this.loadToken();
		const httpOptions = {
headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': this.authToken
			})
		};
		return this.http.get('http://localhost:3000/users/profile', httpOptions);

	}

	storeUserData(token, user) {
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));
		this.authToken = token;
		this.user = user;
	}

	loadToken() {
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}
	
	loggedIn() {
		this.loadToken();
		return this.jwtHelper.isTokenExpired(this.authToken);
	}

	logout() {
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}

}
