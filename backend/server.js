var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var functions = require('./functions');

var Twitter = require('twitter');

var app = express();

// functions.autoAuthorize(); not need for auth
var tweetsData = [
];

var twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

twitter.stream('statuses/filter', {track: '#esri,#esriuc'}, function(stream) {
    stream.on('data', function(tweet) {
        console.log('--------------------');
        console.log(`${tweetsData.length + 1} >>> ${tweet.user.name}(@${tweet.user.screen_name}): ${tweet.text}`);
        tweetsData.push(tweet);
        console.log('--------------------');
    });
    stream.on('error', function(error) {
        throw error;
    });
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

app.get('/stream', function(req, res, next) {
    res.json({
        success: true,
        index: tweetsData.length,
        data: tweetsData.slice(req.query.index)
    });
});

app.post('/authorize', functions.authorize);
app.post('/search', functions.search);
app.post('/user', functions.user);

app.listen(4200);
console.log('listening on 4200');
