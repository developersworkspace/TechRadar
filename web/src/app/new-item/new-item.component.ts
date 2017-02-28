// Imports
import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

// Imports for HTTP requests
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Imports View Models
import { NewItemViewModel } from './../view-models/new-item-view-model';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  newItemViewModel: any = null;
  isAuthenticated: Boolean = false;
  decodedToken: any = null;

  constructor(http: Http) {
    this.newItemViewModel = new NewItemViewModel(http);
  }

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
