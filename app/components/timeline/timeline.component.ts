import { Component, Input } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";

@Component({
  selector: 'tw-timeline',
  templateUrl: './app/components/timeline/timeline.component.html'
})
export class TimelineComponent {
  @Input() tweets;
  @Input() havingServerError;

  showingRetweet: boolean = false;

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
}
