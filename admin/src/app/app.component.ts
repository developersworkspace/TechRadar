// Imports
import { Component, OnInit } from '@angular/core';

// Imports for HTTP requests
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Import environment configuration
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public data: any = null;
  public newBlip: any = {
    title: null,
    description: null,
    quadrant: null,
    votes: null
  };

  constructor(private http: Http) { }

  ngOnInit() {
    this.loadData();
  }

  onClick_Delete(blip) {
    let headers = new Headers();
    headers.append('jwt', localStorage.getItem('jwt'));

    this.http.post(environment.apiUri + '/admin/blip/delete',
      {
        id: blip.id
      },
      {
        headers: headers
      })
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.loadData();
      }, (err: Error) => {

      });
  }

  onClick_Submit() {
    let headers = new Headers();
    headers.append('jwt', localStorage.getItem('jwt'));

    this.http.post(environment.apiUri + '/admin/blip/create',
      {
        title: this.newBlip.title,
        description: this.newBlip.description,
        quadrant: this.newBlip.quadrant,
        votes: this.newBlip.votes
      },
      {
        headers: headers
      })
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.loadData();
      }, (err: Error) => {

      });
  }

  loadData() {

    let headers = new Headers();
    headers.append('jwt', localStorage.getItem('jwt'));

    this.http.get(environment.apiUri + '/admin/blip/list',
      {
        headers: headers
      })
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.data = result;
      }, (err: Error) => {

      });
  }
}
