import { Component, Input } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'tw-most-popular',
  templateUrl: './app/components/most-popular/most-popular.component.html',
  styleUrls: ['./app/components/most-popular/most-popular.component.css']
})
export class MostPopularComponent {
  mediaRanks = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
      this.dataService.socket.on('media rank', (ranks) => {
            this.mediaRanks = ranks;
      });

      this.dataService
          .getMissedRanking('media')
          .subscribe(res => {
            this.mediaRanks = res.json().data;
            console.log('Just fetched latest media ranking.');
      });
  }
}
