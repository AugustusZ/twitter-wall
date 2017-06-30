import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HashtagsComponent } from './components/hashtags/hashtags.component';
import { StarTwitterComponent } from './components/star-twitter/star-twitter.component';
import { TopicsComponent } from './components/topics/topics.component';
import { MostPopularComponent } from './components/most-popular/most-popular.component';
import { MapComponent } from './components/map/map.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TweetComponent } from './components/timeline/tweet.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HashtagsComponent,
    StarTwitterComponent,
    TopicsComponent,
    MostPopularComponent,
    MapComponent,
    TimelineComponent,
    TweetComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
