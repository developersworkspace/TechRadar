// Imports
import { Component, OnInit } from '@angular/core';

// Imports for HTTP requests
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Imports View Models
import { TechRadarViewModel } from './../view-models/tech-radar-view-model';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.css']
})
export class RadarComponent implements OnInit {


  public techRadarChartViewModel: any = null;
  

  constructor(http: Http) { 
    this.techRadarChartViewModel = new TechRadarViewModel(http);
  }

  ngOnInit() {
    
  }
}
