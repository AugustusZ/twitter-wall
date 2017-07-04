import { Component } from '@angular/core';

@Component({
  selector: 'tw-hashtags',
  templateUrl: './app/components/hashtags/hashtags.component.html',
  styleUrls: ['./app/components/hashtags/hashtags.component.css']
})
export class HashtagsComponent {
  tags: string[];
  editable: boolean;
  isEditing: boolean;

  constructor() {
    this.tags = [
      'Esri',
      'EsriUC'
    ];
    this.isEditing = false;
    this.editable = false;
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
    var tagified = this.tagify(newHashtag);
    if (tagified !== '') {
      this.tags.push(tagified);
    }
  }

  tagify(str: string): string {
    return str.replace(/[^A-Za-z0-9+]+/gi, '');
  }
}
