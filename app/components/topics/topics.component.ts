import { Component, Input } from '@angular/core';

@Component({
  selector: 'tw-topics',
  templateUrl: './app/components/topics/topics.component.html'
})
export class TopicsComponent {
  @Input() topicRanks;
}
