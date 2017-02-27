// Imports
import { Component } from '@angular/core';

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
export class AppComponent {
  title = 'app works!';

  public data: any = null;

  constructor(private http: Http) {
    this.getData();
  }

  private getData() {
    this.http.get(environment.apiUri + '/data')
      .map((res: Response) => res.json())
      .subscribe((result: any) => {
        this.data = result;
      });
  }
}
