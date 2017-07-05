import { Component, Input } from '@angular/core';

@Component({
  selector: 'tw-tweet',
  templateUrl: './app/components/timeline/tweet.component.html',
  styleUrls: ['./app/components/timeline/tweet.component.css', './app/components/shared/tweet-user.css']
})
export class TweetComponent {
  @Input() tweet;
  @Input() showingRetweet;

  tweetTextHtml: string = 'N/A';

  ngOnChanges() {
    this.tweetTextHtml = this.linkifyEntities(this.tweet);
    if (this.tweet.hasOwnProperty('display_text_range')) {
      // delete the tailing url for media
      let tailUrl = this.tweet.text.slice(this.tweet.display_text_range[1], this.tweet.length);
      this.tweetTextHtml = this.tweetTextHtml.replace(tailUrl, '');
    }
  }

  escapeHTML(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
  }

  // from https://gist.github.com/wadey/442463
  // also saw this https://github.com/twitter/twitter-text-js but it does not support angular yet.

  linkifyEntities(tweet: object) { 
      // This is very naive, should find a better way to parse this
      let indexMap = {};
      
      tweet.entities.urls.map((entry, i) => {
          indexMap[entry.indices[0]] = [
            entry.indices[1], 
            (text) => {
              return `<a href="${entry.expanded_url}">${entry.display_url}</a>`;
            }
          ];
      });
      
      tweet.entities.hashtags.map((entry, i) => {
          indexMap[entry.indices[0]] = [
            entry.indices[1], 
            (text) => {
              return `<a href="https://twitter.com/hashtag/${entry.text}">#${entry.text}</a>`;
            }
          ];
      });
      
      tweet.entities.user_mentions.map((entry, i) => {
          indexMap[entry.indices[0]] = [
            entry.indices[1], 
            (text) => {
              return `<a title="${entry.name}" href="http://twitter.com/${entry.screen_name}">${entry.name}</a>`;
            }
          ];
      });
      
      let result:string = '';
      let last_i = 0;
      let i = 0;
      
      // iterate through the string looking for matches in the indexMap
      for (i = 0; i < tweet.text.length; i++) {
          let indexMapEntry = indexMap[i];
          if (indexMapEntry) {
              let end = indexMapEntry[0];
              let func = indexMapEntry[1];
              if (i > last_i) {
                  result += this.escapeHTML(tweet.text.substring(last_i, i));
              }
              result += func(tweet.text.substring(i, end));
              i = end - 1;
              last_i = end;
          }
      }
      
      if (i > last_i) {
          result += this.escapeHTML(tweet.text.substring(last_i, i));
      }
      console.log(result);
      return result;
  }
}
