var request = require('request');

functions = {
    condenseUser: function(user) {
        return user = {
            name: user.name,
            screen_name: user.screen_name,
            verified: user.verified,
            profile_image_url: user.profile_image_url
        }
    },

    condenseTweet: function(tweet) {
        return condensed = {
            created_at: tweet.created_at,
            id: tweet.id,
            text: tweet.text,
            display_text_range: tweet.display_text_range,
            user: functions.condenseUser(tweet.user),
            is_original: !(!!tweet.retweeted_status || !!tweet.quoted_status),
            entities: tweet.entities,
            lang: tweet.lang,
            timestamp_ms: tweet.timestamp_ms
        }
    },

    getRanks: function(ranking, numOfRanks, cache) {
        let rank = [];
        ranking.find({ position: { $gte: 1, $lte: numOfRanks }, $limit: numOfRanks }).map(r => {
            rank[r.position - 1] = cache[r.playerId];
        });
        return rank;
    }


}

module.exports = functions;
