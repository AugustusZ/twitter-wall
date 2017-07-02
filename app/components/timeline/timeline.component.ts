import { Component } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";

@Component({
  selector: 'tw-timeline',
  templateUrl: './app/components/timeline/timeline.component.html'
})
export class TimelineComponent {
  tweets = [];
  refreshInterval: number = 1000; // can be dynamic
  index: number = 0;
  showingRetweet: boolean = false;
  havingServerError: boolean = false;
  messages = {
      headText: {
        default: 'Here comes the new tweets!',
        failure: 'Oops...'
      },
      paraText: {
        default: 'Go tweet with those hashtags and see them here!',
        failure: 'Sorry, but the server is on vacation.' // when this.havingServerError
      }
  }

  constructor(private http: Http) {
      setInterval(() => { this.fetchTweets(); }, this.refreshInterval);
  }

  fetchTweets() {
    console.log('Fetching lastest tweets...');

    let params: URLSearchParams = new URLSearchParams();
    params.set('index', this.index.toString());

    this.http.get('http://localhost:4200/stream', {
        search: params
    }).subscribe(
        res => {
            this.havingServerError = false;
            var newTweets = res.json().data;
            this.index = res.json().index;
            newTweets.forEach(newTweet => {
                this.tweets.unshift(newTweet); // prepend 
            });
            console.log(newTweets);
            },
        err => {
            this.havingServerError = true; // failure
        }
    );
  }
}
