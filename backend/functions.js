var request = require('request');
var config = require('./config');

functions = {
    authorize: function(req, res) {
        var header = `${config.consumerkey}:${config.consumersecret}`;
        var encoded_header = new Buffer(header).toString('base64');

        request.post('https://api.twitter.com/oauth2/token', 
            {
                headers: { 
                    Authorization: `Basic ${encoded_header}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                form: {'grant_type': 'client_credentials'}
            }, function (err, response, body) {
                if (err) {
                    console.log(err);
                } else {
                    config.bearertoken = JSON.parse(body).access_token;
                    res.json({
                        success: true,
                        data: config.bearertoken
                    });
                }
            });
    },

    search: function(req, res) {
        var encoded_search_query = encodeURIComponent(req.body.query);

        request.get(`https://api.twitter.com/1.1/search/tweets.json?q=${encoded_search_query}&result_type=recent`, 
            {
                headers: { 
                    Authorization: `Bearer ${config.bearertoken}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }, function (err, response, body) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        success: true,
                        data: JSON.parse(body)
                    });
                }
            });
    },

    user: function(req, res) {
        var encoded_search_query = encodeURIComponent(req.body.screenname);

        request.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${encoded_search_query}&count=5`, 
            {
                headers: { 
                    Authorization: `Bearer ${config.bearertoken}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }, function (err, response, body) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        success: true,
                        data: JSON.parse(body)
                    });
                }
            });
    }

}

module.exports = functions;
