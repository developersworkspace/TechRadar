import { Component } from '@angular/core';


import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

   public data: any = null;

   constructor(private http: Http) { 
     this.http.get('http://localhost:3000/api/data')
     .map((res: Response) => res.json())
     .subscribe((result: any) => {
      this.data = result;
     });
   }
}
