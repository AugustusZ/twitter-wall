import { Component, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'tw-star-twitter',
  templateUrl: './app/components/star-twitter/star-twitter.component.html',
  styleUrls: ['./assets/css/tweet-user.css']
})
export class StarTwitterComponent {
  @Input() userRanks;

  topNumber: number;

  updateTopNumber(newTopNumber) {
    this.topNumber = newTopNumber;
  }
}
