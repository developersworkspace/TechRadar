// Imports for HTTP requests
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Import environment configuration
import { environment } from './../../environments/environment';

export class SuggestViewModel {

    title: string;
    description: string;
    quadrant: string;

    message: string;

    constructor(private http: Http) {

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

        this.http.post(environment.apiUri + '/data/create', {
            title: this.title,
            description: this.description,
            quadrant: this.quadrant
        })
            .map((res: Response) => res.json())
            .subscribe((result: any) => {
                this.title = null;
                this.description = null;
                this.quadrant = null;
            });
    }
}
