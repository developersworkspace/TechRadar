// Imports for HTTP requests
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Import environment configuration
import { environment } from './../../environments/environment';

// Imports models
import { Blip } from './../models/blip';

export class TechRadarViewModel {

    public data: Blip[] = null;
    public selectedBlip: Blip = null;
    public selectedBlipDetails: Blip = null;

    constructor(private http: Http) {
        this.loadData();
    }

    public onClick_DataPoint(item: Blip) {
        this.selectedBlip = item;
    }

    public onClick_UpVote() {
        let headers = new Headers();
        headers.append('jwt', localStorage.getItem('jwt'));

        this.http.post(environment.apiUri + '/blip/upvote', {
            id: this.selectedBlip.id
        }, {
                headers: headers
            })
            .map((res: Response) => res.json())
            .subscribe((result: Boolean) => {
                this.loadData();
            }, (err: Error) => {

            });
    }

    public onClick_DownVote() {
        let headers = new Headers();
        headers.append('jwt', localStorage.getItem('jwt'));

        this.http.post(environment.apiUri + '/blip/downvote', {
            id: this.selectedBlip.id
        }, {
                headers: headers
            })
            .map((res: Response) => res.json())
            .subscribe((result: Boolean) => {
                this.loadData();
            }, (err: Error) => {

            });
    }

    private loadData() {
        let headers = new Headers();
        headers.append('jwt', localStorage.getItem('jwt'));

        this.http.get(environment.apiUri + '/blip/list', {
            headers: headers
        })
            .map((res: Response) => res.json())
            .subscribe((result: Blip[]) => {
                this.data = result;
            }, (err: Error) => {

            });
    }
}
