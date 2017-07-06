condensers = {
    condenseUser: (user) => {
        return user = {
            name: user.name,
            screen_name: user.screen_name,
            verified: user.verified,
            profile_image_url: user.profile_image_url
        }
    },

    condenseTweet: (tweet) => {
        return condensed = {
            created_at: tweet.created_at,
            id_str: tweet.id_str,
            text: tweet.text,
            display_text_range: tweet.display_text_range,
            user: condensers.condenseUser(tweet.user),
            is_original: !(!!tweet.retweeted_status || !!tweet.quoted_status),
            entities: tweet.entities,
            timestamp_ms: tweet.timestamp_ms
        }
    }
}

module.exports = condensers;
