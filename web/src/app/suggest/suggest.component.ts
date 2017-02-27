// Imports
import { Component, OnInit } from '@angular/core';

// Imports for HTTP requests
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Imports View Models
import { SuggestViewModel } from './../view-models/suggest-view-model';

@Component({
  selector: 'app-suggest',
  templateUrl: './suggest.component.html',
  styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {

  public suggestViewModel: any = null;

  constructor(http: Http) {
    this.suggestViewModel = new SuggestViewModel(http);
   }

  ngOnInit() {
  }

}
