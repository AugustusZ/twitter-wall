import { Component, Input, EventEmitter } from '@angular/core';
import { DataService } from '../shared/data.service';
import { animations } from '../shared/animations';

@Component({
  selector: 'tw-topics',
  templateUrl: './app/components/topics/topics.component.html',
  styleUrls: ['./app/components/topics/topics.component.css'],
  animations: [ animations(300, 50, '-100%') ]
})
export class TopicsComponent {
  topicRanks = [];
  topNumber: number = 1;

  constructor(private dataService: DataService) {}

  ngOnInit() {
      this.dataService.socket.on('topic rank', (ranks) => {
            this.topicRanks = ranks;
      });

      this.dataService
          .getMissedRanking('topic')
          .subscribe(res => {
            this.topicRanks = res.json().data;
            console.log('Just fetched latest topic ranking.');
      });
  }

  updateTopNumber(newTopNumber) {
    this.topNumber = newTopNumber;
  }
}
