import { Component, Input } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { DataService } from '../shared/data.service';
import { animations } from '../shared/animations'

@Component({
  selector: 'tw-timeline',
  templateUrl: './app/components/timeline/timeline.component.html',
  animations: [ animations() ]
})
export class TimelineComponent {
  tweets = [];
  showingRetweet: boolean = true;
  hasFetchedMissedTweets: boolean = false;
  @Input() havingServerError;
  
  constructor(private dataService: DataService) {}

  ngOnInit() {
      this.dataService.socket.on('new tweet', (tweet) => {
            this.hasFetchedMissedTweets = true;
            this.tweets.unshift(tweet); // prepend 
      });

      this.dataService
          .getMissedTweets()
          .subscribe(res => {
            res.json().data.forEach((tweet) => {
                this.tweets.unshift(tweet); // prepend 
            });
            console.log('Just fetched missed tweets.');
      });
  }

  messages = {
      headText: {
        default: 'Here come the new tweets!',
        failure: 'Oops...'
      },
      paraText: {
        default: 'Go tweet with those hashtags and see them here!',
        failure: 'Sorry, but the server is on vacation.' // when this.havingServerError
      }
  }
}
