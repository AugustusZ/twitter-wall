import { Component, Input } from '@angular/core';

@Component({
  selector: 'tw-tweet',
  templateUrl: './app/components/timeline/tweet.component.html',
  styleUrls: ['./app/components/timeline/tweet.component.css', './app/components/shared/tweet-user.css']
})
export class TweetComponent {
  @Input() tweet;
  @Input() showingRetweet;
}
