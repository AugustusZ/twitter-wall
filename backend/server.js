var express = require('express');
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

var app = express();

// CACHE on server to keep track of information
var tweetsData = [];
var userCache = {};
var topicCache = {};
var mediaCache = {};
var topicIdMap = {}; // topic -> topicId

// RANKING information to maintain along the time
const userRanking = new Ranking({ maxScore: 1000000, branchFactor: 1000 });
const topicRanking = new Ranking({ maxScore: 1000000, branchFactor: 1000 });
const mediaRanking = new Ranking({ maxScore: 1000000, branchFactor: 1000 });

var twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

var vocabularyStream = fs.createWriteStream('./words.txt');

// mock data streaming API
// data.map((tweet) => {
twitter.stream('statuses/filter', {track: '#esri,#esriuc'}, function(stream) {
    stream.on('data', function(tweet) {
        console.log(`${tweetsData.length + 1} >>> ${tweet.user.name}(@${tweet.user.screen_name}): ${tweet.text}`);
        console.log('----------------------------------------');

        tweetsData.push(functions.condenseTweet(tweet));

        // rank user
        let userId = tweet.user.id;
        if (userId in userCache) {
            userCache[userId].count++;
        } else {
            userCache[userId] = {
                count: 1,
                user: functions.condenseUser(tweet.user)
            };
        }
        userRanking.addPlayerPoints({ playerId: userId, points: 1 });

        // rank topic
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

                if (topicId in topicCache) {
                    topicCache[topicId].count++;	
                } else {
                    topicCache[topicId] = {
                        count: 1,
                        topic: topic
                    };
                }
                topicRanking.addPlayerPoints({ playerId: topicId, points: 1 });
            } 
        });

        // rank media (most popular tweet with media)
        let retweetedTweet = tweet.retweeted_status;
        if (!!retweetedTweet) {
            let media = retweetedTweet.entities.media;
            if (!!media && media.length > 0) { // there is retweeted media.
                let mediaId = media[0].id;
                let weight = retweetedTweet.retweet_count * 2 + retweetedTweet.favorite_count;
                if (mediaId in mediaCache) {
                    if (weight > mediaCache[mediaId]) {
                        userRanking.addPlayerPoints({ playerId: mediaId, points: mediaCache[mediaId] - weight });
                        mediaCache[mediaId].weight = weight;
                    }
                } else {
                    mediaCache[mediaId] = {
                        weight: weight,
                        media: media
                    };
                    mediaRanking.addPlayerPoints({ playerId: mediaId, points: weight });
                }
            }
        }

    });

    stream.on('error', function(error) {
        throw error;
    });
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

app.get('/', function(req, res, next) {
    res.json({
        success: true,
        tweets: {
        	index: tweetsData.length,
        	data: tweetsData.slice(req.query.index)
        },
        ranks: {
 			user_ranks: functions.getRanks(userRanking, numOfRanks.NUM_OF_USER_RANKS, userCache), 
 			topic_ranks: functions.getRanks(topicRanking, numOfRanks.NUM_OF_TOPIC_RANKS, topicCache), 
 			media_ranks: functions.getRanks(mediaRanking, numOfRanks.NUM_OF_MEDIA_RANKS, mediaCache)
        }
    });
});

app.listen(4321);
console.log('listening on 4321');
