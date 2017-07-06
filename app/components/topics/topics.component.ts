import { Component, Input, EventEmitter } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'tw-topics',
  templateUrl: './app/components/topics/topics.component.html',
  styleUrls: ['./app/components/topics/topics.component.css']
})
export class TopicsComponent {
  topicRanks = [];
  topNumber: number;

  constructor(private dataService: DataService) {}

  ngOnInit() {
      this.dataService.socket.on('topic rank', (ranks) => {
            this.topicRanks = ranks;
      })
  }

  updateTopNumber(newTopNumber) {
    this.topNumber = newTopNumber;
  }
}
