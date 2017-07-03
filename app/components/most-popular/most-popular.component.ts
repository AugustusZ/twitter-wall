import { Component, Input } from '@angular/core';

@Component({
  selector: 'tw-most-popular',
  templateUrl: './app/components/most-popular/most-popular.component.html',
  styleUrls: ['./assets/css/most-popular.component.css']
})
export class MostPopularComponent {
  @Input() mediaRanks;
}
