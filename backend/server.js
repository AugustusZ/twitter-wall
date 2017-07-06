var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 4444;

var bodyparser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var Twitter = require('twitter');
var KeywordExtractor = require('keyword-extractor');
var Ranking = require('ranking');

var functions = require('./functions');
var numOfRanks = require('./config').rankSettings;
var blacklist = require('./config').topicSettings.blacklist;
var data = require('./data').data;

// CACHE on server to keep track of information
var tweetsData = [];
var topicIdMap = {}; // topic -> topicId

var cacheData = {
    'user': {},
    'topic': {},
    'media': {}
}
// RANKING information to maintain along the time

var twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

var vocabularyStream = fs.createWriteStream('./words.txt');



        let userId = tweet.user.id;
        } else {
                count: 1,
                user: functions.condenseUser(tweet.user)
            };
        }

        KeywordExtractor.extract(tweet.text, {
            language: "english",
            remove_digits: true,
            return_changed_case: true,
            remove_duplicates: false
        }).map((keyword) => {
            let topic = keyword.replace(/[^A-Za-z0-9\.+]+/gi, '');
            
            if (blacklist.indexOf(topic) < 0) {

                // collect words
                vocabularyStream.write(`${topic}\n`);
                
                // get topic id
                let topicId;
                if (topic in topicIdMap) {
                    topicId = topicIdMap[topic];
                } else {
                    topicId = Object.keys(topicIdMap).length;
                    topicIdMap[topic] = topicId;
                }

                } else {
                        count: 1,
                        topic: topic
                    };
                }
            } 
        });

        let retweetedTweet = tweet.retweeted_status;
        if (!!retweetedTweet) {
            let media = retweetedTweet.entities.media;
            if (!!media && media.length > 0) { // there is retweeted media.
                let mediaId = media[0].id;
                let weight = retweetedTweet.retweet_count * 2 + retweetedTweet.favorite_count;
                    }
                } else {
                        weight: weight,
                        media: media
                    };
                }
            }
        }
}

// // mock data streaming API
// var offest = 1000;
//         updateWithNewTweet(tweet);
//     }, offest); offest += 1000;

twitter.stream('statuses/filter', {track: '#esri,#esriuc'}, function(stream) {
    stream.on('data', function(tweet) {
        updateWithNewTweet(tweet);
    });
    stream.on('error', function(error) {
        throw error;
    });
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

});

