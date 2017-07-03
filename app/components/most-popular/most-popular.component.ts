import { Component, Input } from '@angular/core';

@Component({
  selector: 'tw-most-popular',
  templateUrl: './app/components/most-popular/most-popular.component.html'
})
export class MostPopularComponent {
  @Input() mediaRanks;
}
