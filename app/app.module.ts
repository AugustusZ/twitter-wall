import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './components/app.component';
import { TwitterRestApiComponent } from "./components/twitter-api/twitter-rest-api.component";
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
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    TwitterRestApiComponent,
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
    TwitterRestApiComponent,
    AppComponent
  ]
})
export class AppModule {}
