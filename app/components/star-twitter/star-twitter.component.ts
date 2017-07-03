import { Component, Input } from '@angular/core';

@Component({
  selector: 'tw-star-twitter',
  templateUrl: './app/components/star-twitter/star-twitter.component.html'
})
export class StarTwitterComponent {
  @Input() userRanks;
}
