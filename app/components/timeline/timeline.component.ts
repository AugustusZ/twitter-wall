import { Component } from '@angular/core';

@Component({
  selector: 'tw-timeline',
  templateUrl: './app/components/timeline/timeline.component.html'
})
export class TimelineComponent {
  tweets = [
      {
          userName: 'John Doe',
          userId: 'johndoe',
          text: 'This is the latest tweet w/ #hashtag #hashtags',
          timeText: 'a few seconds ago',
          profileImageUrl: 'https://pbs.twimg.com/profile_images/758106920645296128/uTuvtC4A_bigger.jpg'
      },
      {
          userName: 'Jane Roe',
          userId: 'janeroe',
          text: 'This is a tweet with #hashtags and an image.',
          mediaType: 'image',
          mediaUrl: 'https://pbs.twimg.com/media/DDl7RQuUMAALJsp.jpg',
          timeText: 'a few seconds ago',
          profileImageUrl: 'https://pbs.twimg.com/profile_images/758106920645296128/uTuvtC4A_bigger.jpg'
      }
  ];
}
