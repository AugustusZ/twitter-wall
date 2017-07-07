import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { Socket } from 'ng2-socket-io';
 
@Injectable()
export class DataService {
    _url: string = 'http://localhost:4444/missed';
    missedTweets = [];
 
    constructor(private socket: Socket, private http: Http) {}

    getMissedTweets() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('what', 'mt'); // missed tweet
        return this.http.get(this._url, {
            search: params
        });
    }

    getMissedRanking(what) { // what: 'user' | 'topic' | 'media'
        let params: URLSearchParams = new URLSearchParams();
        params.set('what', what); 
        return this.http.get(this._url, {
            search: params
        });
    }
}
