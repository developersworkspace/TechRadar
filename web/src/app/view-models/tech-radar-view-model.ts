// Imports for HTTP requests
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Import environment configuration
import { environment } from './../../environments/environment';

export class TechRadarViewModel {

    public data: any = null;
    public selectedItem: any = null;
    public selectedItemDetails: any = null;



    constructor(private http: Http) {
        this.loadData();
    }

    public onClick_DataPoint(item: any) {
        this.selectedItem = item;
    }

    public onClick_UpVote() {
        let headers = new Headers();
        headers.append('jwt', localStorage.getItem('jwt'));

        this.http.post(environment.apiUri + '/data/upvote', {
            id: this.selectedItem.id
        }, {
                headers: headers
            })
            .map((res: Response) => res.json())
            .subscribe((result: any) => {
                this.loadData();
            }, (err: Error) => {

            });
    }

    public onClick_DownVote() {
        let headers = new Headers();
        headers.append('jwt', localStorage.getItem('jwt'));

        this.http.post(environment.apiUri + '/data/downvote', {
            id: this.selectedItem.id
        }, {
                headers: headers
            })
            .map((res: Response) => res.json())
            .subscribe((result: any) => {
                this.loadData();
            }, (err: Error) => {

            });
    }

    private loadData() {
        let headers = new Headers();
        headers.append('jwt', localStorage.getItem('jwt'));

        this.http.get(environment.apiUri + '/data', {
            headers: headers
        })
            .map((res: Response) => res.json())
            .subscribe((result: any) => {
                this.data = result;
            }, (err: Error) => {

            });
    }
}
