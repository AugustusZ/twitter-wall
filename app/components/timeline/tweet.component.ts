import { Component, Input } from '@angular/core';

@Component({
  selector: 'tw-tweet',
  templateUrl: './app/components/timeline/tweet.component.html',
  styleUrls: ['./assets/css/tweet.component.css']
})
export class TweetComponent {
  @Input() tweet;
}
