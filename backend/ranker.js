var fs = require('fs');
var Ranking = require('ranking');
var KeywordExtractor = require('keyword-extractor');

var condensers = require('./condensers');
var config = require('./config');

var ranker = {
    vocabularyStream: fs.createWriteStream(config.wordCollectionFileName),

    numberOfRanks: {
        'user': config.rankSettings['user'],
        'topic': config.rankSettings['topic'],
        'media': config.rankSettings['media']
    },

    topicIdMap: {}, // topic -> topicId
    
    cacheData: {
        'user': {},
        'topic': {},
        'media': {}
    },

    // RANKING information to maintain along the time
    rankingData: {
        'user': new Ranking({ maxScore: 1000000, branchFactor: 1000 }),
        'topic': new Ranking({ maxScore: 1000000, branchFactor: 1000 }),
        'media': new Ranking({ maxScore: 1000000, branchFactor: 1000 })
    },

    previousRankingStr: {
        'user': '',
        'topic': '',
        'media': ''
    },

    updateRanking: {
        'user': (tweet) => {
            let userId = tweet.user.id;
            if (userId in ranker.cacheData['user']) {
                ranker.cacheData['user'][userId].count++;
            } else {
                ranker.cacheData['user'][userId] = {
                    count: 1,
                    data: condensers.condenseUser(tweet.user)
                };
            }
            ranker.rankingData['user'].addPlayerPoints({ playerId: userId, points: 1 });
        },

        'topic': (tweet) => {
            KeywordExtractor.extract(tweet.text, {
                language: "english",
                remove_digits: true,
                return_changed_case: true,
                remove_duplicates: false
            }).filter((keyword) => {
                return !keyword.match(/^http[s]*:\/\//i);
            }).map((keyword) => {
                let topic = keyword.replace(/[^A-Za-z0-9\.+]+/gi, '');
                
                if (config.blacklist.indexOf(topic) < 0) {

                    // collect words
                    ranker.vocabularyStream.write(`${topic}\n`);
                    
                    // get topic id
                    let topicId;
                    if (topic in ranker.topicIdMap) {
                        topicId = ranker.topicIdMap[topic];
                    } else {
                        topicId = Object.keys(ranker.topicIdMap).length;
                        ranker.topicIdMap[topic] = topicId;
                    }

                    if (topicId in ranker.cacheData['topic']) {
                        ranker.cacheData['topic'][topicId].count++;	
                    } else {
                        ranker.cacheData['topic'][topicId] = {
                            count: 1,
                            data: topic
                        };
                    }
                    ranker.rankingData['topic'].addPlayerPoints({ playerId: topicId, points: 1 });
                } 
            });
        },

        'media': (tweet) => {
            let mediaTweet = !!tweet.retweeted_status ? tweet.retweeted_status : tweet;
            let media = mediaTweet.entities.media;
            if (!!media && media.length > 0) { // there is retweeted media.
                let mediaId = media[0].id;
                let weight = mediaTweet.retweet_count * 2 + mediaTweet.favorite_count + 1;
                if (mediaId in ranker.cacheData['media']) {
                    if (weight > ranker.cacheData['media'][mediaId]) {
                        ranker.rankingData['media'].addPlayerPoints({ playerId: mediaId, points: ranker.cacheData['media'][mediaId] - weight });
                        ranker.cacheData['media'][mediaId].weight = weight;
                    }
                } else {
                    ranker.cacheData['media'][mediaId] = {
                        count: weight,
                        data: media
                    };
                    ranker.rankingData['media'].addPlayerPoints({ playerId: mediaId, points: weight });
                }
            }
        }
    },

    getRanks: (ranking, numOfRanks, cache) => {
        let rank = [];
        ranking.find({ position: { $gte: 1, $lte: numOfRanks }, $limit: numOfRanks }).map(r => {
            rank[r.position - 1] = cache[r.playerId];
        });
        return rank;
    }
};

module.exports = ranker;
