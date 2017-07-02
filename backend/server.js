var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');
var functions = require('./functions');

var app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());
app.post('/authorize', functions.authorize);
app.post('/search', functions.search);
app.post('/user', functions.user);

app.listen(4200);
console.log('listening on 4200');
