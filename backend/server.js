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
var rankingData = {
    'user': new Ranking({ maxScore: 1000000, branchFactor: 1000 }),
    'topic': new Ranking({ maxScore: 1000000, branchFactor: 1000 }),
    'media': new Ranking({ maxScore: 1000000, branchFactor: 1000 })
}

var previousRankings = {
    'user': {},
    'topic': {},
    'media': {}
}

var updateRanking = {
    'user': (tweet) => {
        let userId = tweet.user.id;
        if (userId in cacheData['user']) {
            cacheData['user'][userId].count++;
        } else {
            cacheData['user'][userId] = {
                count: 1,
                user: functions.condenseUser(tweet.user)
            };
        }
        rankingData['user'].addPlayerPoints({ playerId: userId, points: 1 });
    },

    'topic': (tweet) => {
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

                if (topicId in cacheData['topic']) {
                    cacheData['topic'][topicId].count++;	
                } else {
                    cacheData['topic'][topicId] = {
                        count: 1,
                        topic: topic
                    };
                }
                rankingData['topic'].addPlayerPoints({ playerId: topicId, points: 1 });
            } 
        });
    },

    'media': (tweet) => {
        let retweetedTweet = tweet.retweeted_status;
        if (!!retweetedTweet) {
            let media = retweetedTweet.entities.media;
            if (!!media && media.length > 0) { // there is retweeted media.
                let mediaId = media[0].id;
                let weight = retweetedTweet.retweet_count * 2 + retweetedTweet.favorite_count;
                if (mediaId in cacheData['media']) {
                    if (weight > cacheData['media'][mediaId]) {
                        rankingData['media'].addPlayerPoints({ playerId: mediaId, points: cacheData['media'][mediaId] - weight });
                        cacheData['media'][mediaId].weight = weight;
                    }
                } else {
                    cacheData['media'][mediaId] = {
                        weight: weight,
                        media: media
                    };
                    rankingData['media'].addPlayerPoints({ playerId: mediaId, points: weight });
                }
            }
        }
    }
}

var twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

var vocabularyStream = fs.createWriteStream('./words.txt');

var updateRankingToClient = function(what) {
    let currentRanking = functions.getRanks(rankingData[what], numOfRanks[what], cacheData[what]);
    if (JSON.stringify(previousRankings[what]) !== JSON.stringify(currentRanking)) {
        previousRankings[what] = currentRanking;
        io.emit(`new ${what} rank`, currentRanking);
    }
}

var updateWithNewTweet = function(tweet) {
    console.log(`            | ${tweetsData.length + 1} >>> ${tweet.user.name} (@${tweet.user.screen_name}): ${tweet.text.slice(0,24)}`);
    console.log('            ----------------------------------------');

    // update data on server
    tweetsData.push(functions.condenseTweet(tweet));
    updateRanking['user'](tweet);
    updateRanking['topic'](tweet);
    updateRanking['media'](tweet);

    // emit to client if necessary
    io.emit('new tweet', functions.condenseTweet(tweet));
    updateRankingToClient('user');
    updateRankingToClient('topic');
    updateRankingToClient('media');
}

io.on('connection', (socket) => {
    console.log(`SOCKCET: A user connected. ID: ${socket.client.conn.id}`);
    socket.on('disconnect', () => {
        console.log(`SOCKCET: A user disconnected. ID: ${socket.client.conn.id}`);
    });
});

// mock data streaming API
var offest = 1000;
data.forEach((tweet) => { setTimeout(function() {
        updateWithNewTweet(tweet);
    }, offest); offest += 1000;
});

// // real data streaming API
// twitter.stream('statuses/filter', {track: '#esri,#esriuc'}, function(stream) {
//     stream.on('data', function(tweet) {
//         updateWithNewTweet(tweet);
//     });
//     stream.on('error', function(error) {
//         throw error;
//     });
// });

app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

app.get('/socket', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
