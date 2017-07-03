import { Component } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";

@Component({
  selector: 'tw-app',
  templateUrl: './app/components/app.component.html'
})
export class AppComponent {
  refreshInterval: number = 1000;
  currentIndex: number = 0;
  havingServerError: boolean = false;
  tweets = [];
  ranks = {
    user_ranks: [],
    topic_ranks: [],
    media_ranks: []
  }; // dummy value

  constructor(private http: Http) {
      setInterval(() => { 
        this.fetchTweets(); 
      }, this.refreshInterval);
  }

  fetchTweets() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('index', this.currentIndex.toString());

    this.http.get('http://localhost:4242/', {
        search: params
    }).subscribe(
      res => {
        var response = res.json();
        this.ranks = response.ranks;
        this.currentIndex = response.tweets.index;
        var newTweets = response.tweets.data;
        newTweets.forEach(newTweet => {
            this.tweets.unshift(newTweet); // prepend 
        });
        if (newTweets.length > 1) {
          console.log(newTweets);
        }
        },
      err => {
          this.havingServerError = true; // failure
      }
    );
  }
}
