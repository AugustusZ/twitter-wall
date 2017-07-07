import { Component, Input, EventEmitter } from '@angular/core';
import { DataService } from '../shared/data.service';
import { animations } from '../shared/animations';

@Component({
  selector: 'tw-star-twitter',
  templateUrl: './app/components/star-twitter/star-twitter.component.html',
  styleUrls: ['./app/components/shared/tweet-user.css', './app/components/star-twitter/star-twitter.component.css' ],
  animations: [ animations(300, 50, '-10%') ]
})
export class StarTwitterComponent {
  userRanks = [];
  topNumber: number = 1;

  constructor(private dataService: DataService) {}

  ngOnInit() {
      this.dataService.socket.on('user rank', (ranks) => {
            this.userRanks = ranks;
      });

      this.dataService
          .getMissedRanking('user')
          .subscribe(res => {
            this.userRanks = res.json().data;
            console.log('Just fetched latest user ranking.');
      });
  }

  updateTopNumber(newTopNumber) {
    this.topNumber = newTopNumber;
  }
}
