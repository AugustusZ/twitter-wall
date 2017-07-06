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

streamer.streamingData(utilities.updateWithNewTweet, io);
// streamer.mockStreamingData(data, utilities.updateWithNewTweet, io);

io.on('connection', (socket) => {
    if (utilities.has(socket, 'client.conn.id')) {
        console.log(`Socket.io: User [${socket.client.conn.id.substring(0,4)}] connected.`);
    }

    // return most recent tweets to user config.numberOfRecentTweets
    let mostRecentTweets = utilities.getMostRecentTweets(); 
    if (mostRecentTweets.length > 0) {
        socket.emit('recent tweets', mostRecentTweets);
    }

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

app.get('/data', function(req, res, next) {
    let data = utilities.tweetsData.slice(req.query.index);
    res.json({
        count: data.length,
        data: data
    });
});

server.listen(config.port, function () {
  console.log('Server listening at port %d', config.port);
});
