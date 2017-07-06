var Twitter = require('twitter');

var streamer = {
    twitter: new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }),

    // mock data streaming API
    mockStreamingData: (data, updateWithNewTweet, io) => {
        var interval = 1000;
        var offest = 0;
        data.forEach((tweet) => { setTimeout(() => {
                updateWithNewTweet(tweet, io);
            }, offest); offest += interval;
        });
    },

    // real data streaming API
    streamingData: (twitter, updateWithNewTweet, io) => {
        twitter.stream('statuses/filter', {track: '#esri,#esriuc'}, function(stream) {
            stream.on('data', function(tweet) {
                updateWithNewTweet(tweet, io);
            });
            stream.on('error', function(error) {
                throw error;
            });
        });
    }
};

module.exports = streamer;
