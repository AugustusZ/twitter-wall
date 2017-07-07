import { Component, Input } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'tw-timeline',
  templateUrl: './app/components/timeline/timeline.component.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query('.new-item:enter', style({ height: 0, opacity: 0}), { optional: true }),
        query('.new-item:enter', stagger('200ms', [
          animate('1s ease-in', keyframes([
            style({ height: 0, opacity: 0, transform: 'translateY(-100%)', offset: 0}),
            style({ height: '*', opacity: 0.5, transform: 'translateY(0)', offset: 0.3}),
            style({ height: '*', opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]), { optional: true })
      ])
    ])
  ]
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
            }).promise(() => {
                this.hasFetchedMissedTweets = true;
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
