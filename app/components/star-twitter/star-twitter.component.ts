import { Component, Input, EventEmitter } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'tw-star-twitter',
  templateUrl: './app/components/star-twitter/star-twitter.component.html',
  styleUrls: ['./app/components/shared/tweet-user.css']
})
export class StarTwitterComponent {
  userRanks = [];
  topNumber: number;

  constructor(private dataService: DataService) {}

  ngOnInit() {
      this.dataService.socket.on('user rank', (ranks) => {
            this.userRanks = ranks;
      });

      this.dataService
          .getMissedRanking('user')
          .subscribe(res => {
            this.userRanks = res.json().data;
            console.log('Just fetched missed user ranking.');
      });
  }

  updateTopNumber(newTopNumber) {
    this.topNumber = newTopNumber;
  }
}
