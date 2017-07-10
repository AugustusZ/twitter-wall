var bodyparser = require('body-parser');
var cors = require('cors');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var utilities = require('./utilities');
var streamer = require('./streamer');
var config = require('./config');
var data = require('./data').data;

if (config.mock) {
    streamer.mockStreamingData(data, utilities.updateWithNewTweet, io);
} else {
    streamer.streamingData(utilities.updateWithNewTweet, io);
}

io.on('connection', (socket) => {
    if (utilities.has(socket, 'client.conn.id')) {
        console.log(`Socket.io: User [${socket.client.conn.id.substring(0,4)}] connected.`);
    }

    socket.on('fetch missed tweets', () => {
        let mostRecentTweets = utilities.getMostRecentTweets(); 
        if (mostRecentTweets.length > 0) {
            console.log(`Socket.io: Emits ${mostRecentTweets.length} tweets to [${socket.client.conn.id.substring(0,4)}].`);
            io.emit('fetch missed tweets', mostRecentTweets);
        }
    });
    
    socket.on('disconnect', () => {
        if (utilities.has(socket, 'client.conn.id')) {
         console.log(`Socket.io: User [${socket.client.conn.id.substring(0,4)}] disconnected.`);
        }
    });
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

app.get('/socket', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/missed', function(req, res, next) {
    let what = req.query.what;
    if (what === 'mt') { // missed tweets
        let mostRecentTweets = utilities.getMostRecentTweets(); 
        console.log(`GET: Sent ${mostRecentTweets.length} tweets.`);
        res.json({
            count: mostRecentTweets.length,
            data: mostRecentTweets
        });
    } else if (['user', 'topic', 'media'].indexOf(what) > -1) { 
        let ranking = utilities.getRankingOf(what);
        res.json({
            count: ranking.length,
            data: ranking
        });
    } else {
        res.json({
            count: -1,
            data: []
        });
    }
});

server.listen(config.port, function () {
  console.log('Server listening at port %d', config.port);
});
