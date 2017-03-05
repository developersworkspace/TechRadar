// Imports
import { JwtHelper } from 'angular2-jwt';

// Imports for HTTP requests
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Import environment configuration
import { environment } from './../../environments/environment';

// Imports models
import { Blip } from './../models/blip';

export class NewBlipViewModel {

    title: string;
    description: string;
    quadrant: string;

    message: string;

    isAuthenticated: Boolean = false;
    decodedToken: any = null;

    constructor(private http: Http) {
        let token = localStorage.getItem("jwt");
        if (token) {
            this.isAuthenticated = true;
            this.decodedToken = new JwtHelper().decodeToken(token);
        } else {
            this.isAuthenticated = false;
            this.decodedToken = null;
        }
    }

    public submit() {

        this.message = null

        if (!this.title) {
            this.message = 'Title cannot be empty';
            return;
        }

        if (!this.description) {
            this.message = 'Description cannot be empty';
            return;
        }

        if (!this.quadrant) {
            this.message = 'Quadrant cannot be empty';
            return;
        }

        let headers = new Headers();
        headers.append('jwt', localStorage.getItem('jwt'));

        this.http.post(environment.apiUri + '/blip/create', {
            title: this.title,
            description: this.description,
            quadrant: this.quadrant
        }, {
                headers: headers
            })
            .map((res: Response) => {
                return res.json();
            })
            .subscribe((result: Error) => {
                this.title = null;
                this.description = null;
                this.quadrant = null;
                window.location.href = '/radar';
            }, (err: Response) => {
                this.message = err.json().message;
            });
    }
}
