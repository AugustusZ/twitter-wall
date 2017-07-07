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

    getRankingOf: (what) => {
        return ranker.getRanks(
            ranker.rankingData[what], 
            ranker.numberOfRanks[what], 
            ranker.cacheData[what]
        );
    },

    updateRankingToClient: (what, io) => {
        let currentRanking = utilities.getRankingOf(what);
        if (JSON.stringify(ranker.previousRankings[what]) !== JSON.stringify(currentRanking)) {
            ranker.previousRankings[what] = currentRanking;
            console.log(`Socket.io: Emits <${what}> ranks.`);
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
        console.log(`Socket.io: Emits a new tweet.`);
        io.emit('new tweet', condensers.condenseTweet(tweet));
        utilities.updateRankingToClient('user', io);
        utilities.updateRankingToClient('topic', io);
        utilities.updateRankingToClient('media', io);
    },

    // https://stackoverflow.com/a/23809123/7090255
    has: (obj, key) => {
        return key.split(".").every((x) => {
            if (typeof obj != "object" || obj === null || ! x in obj) {
                return false;
            }
            obj = obj[x];
            return true;
        });
    }
}

module.exports = utilities;
