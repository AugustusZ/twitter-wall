import { Injectable } from '@angular/core';
import { Socket } from 'ng2-socket-io';
 
@Injectable()
export class DataService {
    missedTweets = [];
 
    constructor(private socket: Socket) {}
}
