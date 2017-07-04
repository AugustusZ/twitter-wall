import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { TimeAgoPipe } from 'time-ago-pipe';

import { AppComponent } from './components/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HashtagsComponent } from './components/hashtags/hashtags.component';
import { StarTwitterComponent } from './components/star-twitter/star-twitter.component';
import { TopicsComponent } from './components/topics/topics.component';
import { MostPopularComponent } from './components/most-popular/most-popular.component';
import { MapComponent } from './components/map/map.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TweetComponent } from './components/timeline/tweet.component';
import { ButtonHeaderComponent } from './components/shared/button-header/button-header.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
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
    TweetComponent,
    ButtonHeaderComponent,
    TimeAgoPipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
