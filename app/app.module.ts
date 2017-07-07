import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeAgoPipe } from 'time-ago-pipe';
import { SocketIoModule, SocketIoConfig } from 'ng2-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

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
import { DataService } from './components/shared/data.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config),
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
  providers: [
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
