// Imports
import { Component, OnInit } from '@angular/core';

// Imports for HTTP requests
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Imports View Models
import { NewBlipViewModel } from './../view-models/new-blip-view-model';

@Component({
  selector: 'app-new-blip',
  templateUrl: './new-blip.component.html',
  styleUrls: ['./new-blip.component.css']
})
export class NewBlipComponent implements OnInit {

  newItemViewModel: any = null;
  
  constructor(http: Http) {
    this.newItemViewModel = new NewBlipViewModel(http);
  }

  ngOnInit() {
    
  }

}
