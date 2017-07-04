import { Component, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'tw-topics',
  templateUrl: './app/components/topics/topics.component.html',
  styleUrls: ['./assets/css/topics.component.css']
})
export class TopicsComponent {
  @Input() topicRanks;
  topNumber: number;
  
  updateTopNumber(newTopNumber) {
    this.topNumber = newTopNumber;
  }
}
