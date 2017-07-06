var condensers = require('./condensers');
var ranker = require('./ranker');
var config = require('./config');

var utilities = {
    tweetsData: [],

    getMostRecentTweets: () => {
        let end = utilities.tweetsData.length;
        let start = end - config.portionLength > 0 ? end - config.portionLength : 0;
        return utilities.tweetsData.slice(start, end);
    },

    updateRankingToClient: (what, io) => {
        let currentRanking = ranker.getRanks(
            ranker.rankingData[what], 
            ranker.numberOfRanks[what], 
            ranker.cacheData[what]
        );
        if (JSON.stringify(ranker.previousRankings[what]) !== JSON.stringify(currentRanking)) {
            ranker.previousRankings[what] = currentRanking;
            io.emit(`${what} rank`, currentRanking);
        }
    },

    updateWithNewTweet: (tweet, io) => {
        console.log(`            | ${utilities.tweetsData.length + 1} >>> ${tweet.user.name} (@${tweet.user.screen_name}): ${tweet.text.slice(0,10)}`);
        console.log('            ----------------------------------------');

        // update data on server
        utilities.tweetsData.push(condensers.condenseTweet(tweet));

        ranker.updateRanking['user'](tweet);
        ranker.updateRanking['topic'](tweet);
        ranker.updateRanking['media'](tweet);

        // emit to client if necessary
        io.emit('new tweet', condensers.condenseTweet(tweet));
        utilities.updateRankingToClient('user', io);
        utilities.updateRankingToClient('topic', io);
        utilities.updateRankingToClient('media', io);
    }
}

module.exports = utilities;
