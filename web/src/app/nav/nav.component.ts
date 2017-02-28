// Imports
import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  isAuthenticated: Boolean = false;
  decodedToken: any = null;

  constructor() { }

  ngOnInit() {
    let token = localStorage.getItem("jwt");
    if (token) {
      this.isAuthenticated = true;
      this.decodedToken = new JwtHelper().decodeToken(token);
    } else {
      this.isAuthenticated = false;
      this.decodedToken = null;
    }
  }

}
