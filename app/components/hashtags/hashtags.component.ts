import { Component } from '@angular/core';

@Component({
  selector: 'tw-hashtags',
  templateUrl: './app/components/hashtags/hashtags.component.html',
  styleUrls: ['./assets/css/hashtags.component.css']
})
export class HashtagsComponent {
  tags: string[] = [];
  isEditing: boolean;

  constructor() {
    this.tags.push('hashtag');
    this.isEditing = false;
  }
  
  onAddButtonClick(e) {
    this.isEditing = !this.isEditing;
  }

  onTagClick(e, targetTag) {
    console.debug(targetTag);
    this.tags = this.tags.filter(tag => tag !== targetTag);
    console.debug(this.tags);
  }

  addNewHashtag(newHashtag) {
    this.tags.push(this.tagify(newHashtag));
  }

  tagify(str: string): string {
    return str.replace(/[^A-Za-z0-9+]+/gi, '');
  }
}
