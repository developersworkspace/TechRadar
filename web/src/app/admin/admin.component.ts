// Imports
import { Component, OnInit } from '@angular/core';

// Imports for HTTP requests
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Import environment configuration
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public data: any = null;

  constructor(private http: Http) { }

  ngOnInit() {

    this.loadData();
  }

  onClick_UpVote(item) {
    this.http.post(environment.apiUri + '/blip/generateupvotes', {
      id: item.id,
      votes: parseInt(item.votes)
    })
      .map((res: Response) => res.json())
      .subscribe((result: Boolean) => {
        this.loadData();
      }, (err: Error) => {

      });
  }

  onClick_DownVote(item) {
    this.http.post(environment.apiUri + '/blip/generatedownvotes', {
      id: item.id,
      votes: parseInt(item.votes)
    })
      .map((res: Response) => res.json())
      .subscribe((result: Boolean) => {
        this.loadData();
      }, (err: Error) => {

      });
  }


  loadData() {
    this.http.get(environment.apiUri + '/blip/list')
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.data = result;
      }, (err: Error) => {

      });
  }

}
