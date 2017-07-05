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
    this.tweetTextHtml = this.linkify_entities(this.tweet);
  }

  escapeHTML(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
  }

  // from https://gist.github.com/wadey/442463
  linkify_entities(tweet: object) { 
      // This is very naive, should find a better way to parse this
      var index_map = {};
      
      tweet.entities.urls.map((entry, i) => {
          index_map[entry.indices[0]] = [
            entry.indices[1], 
            (text) => {
              return `<a href="${entry.display_url}">${text}</a>`;
            }
          ];
      });
      
      tweet.entities.hashtags.map((entry, i) => {
          index_map[entry.indices[0]] = [
            entry.indices[1], 
            (text) => {
              return `<a href="https://twitter.com/hashtag/${entry.text}">#${entry.text}</a>`;
            }
          ];
      });
      
      tweet.entities.user_mentions.map((entry, i) => {
          index_map[entry.indices[0]] = [
            entry.indices[1], 
            (text) => {
              return `<a title="${entry.name}" href="http://twitter.com/${entry.screen_name}">${entry.name}</a>`;
            }
          ];
      });
      
      var result = "";
      var last_i = 0;
      var i = 0;
      
      // iterate through the string looking for matches in the index_map
      for (i=0; i < tweet.text.length; ++i) {
          var ind = index_map[i];
          if (ind) {
              var end = ind[0];
              var func = ind[1];
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
