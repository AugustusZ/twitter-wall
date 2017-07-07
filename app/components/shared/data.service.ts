import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Socket } from 'ng2-socket-io';
 
@Injectable()
export class DataService {
    _url: string = 'http://localhost:4444';
    missedTweets = [];
 
    constructor(private socket: Socket, private http: Http) {}

    getMissedTweets() {
        return this.http.get(`${this._url}/missed`, {
            params: {
                what: 'mt' // stanging for "missed tweet"
            }
        });
    }

    getMissedRanking(what) {
        return this.http.get(`${this._url}/missed`, {
            params: {
                what: what // what: 'user' | 'topic' | 'media'
            }
        });
    }
}
