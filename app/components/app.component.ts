import { Component } from '@angular/core';

@Component({
  selector: 'tw-app',
  templateUrl: './app/components/app.component.html'
})
export class AppComponent {
  tags: string[] = [
    'apple',
    'pineapple'
  ];
}
