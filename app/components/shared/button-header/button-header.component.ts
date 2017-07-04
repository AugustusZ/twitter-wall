import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

@Component({
  selector: 'tw-button-header',
  templateUrl: './app/components/shared/button-header/button-header.component.html',
  styleUrls: ['./app/components/shared/button-header/button-header.component.css']
})
export class ButtonHeaderComponent {
  const numOfMoreTopics: number = 5;
  const numOfLessTopics: number = 1;

  @Output() topNumber = new EventEmitter<number>();
  @Input() template: TemplateRef;

  showingAll: boolean = false;
  const showingTexts: string[] = {
    true: 'less',
    false: 'more'
  }

  ngAfterViewInit() {
    this.topNumber.emit(this.numOfLessTopics);
  }

  toggleShow() {
    this.showingAll = !this.showingAll;
    this.topNumber.emit(this.showingAll ? this.numOfMoreTopics : this.numOfLessTopics);
  }
}
