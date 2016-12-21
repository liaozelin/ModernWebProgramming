/**
 * Module dependencies.
 */

const express = require('express');

const nunjucks = require('nunjucks');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const routes = require('./routes/index');
const api = require('./routes/api');

const app = express();

// Configuration

app.set('views', __dirname + '/views');

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  tags: {
    blockStart: '<%',
    blockEnd: '%>',
    variableStart: '<$',
    variableEnd: '$>',
    commentStart: '<#',
    commentEnd: '#>'
  }
});
app.set('view engine', 'html');
app.set('view options', {
  layout: false
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/public'));

app.use(cookieParser('lzl'));
mongoose.connect('mongodb://localhost/');
var connect = mongoose.createConnection('mongodb://localhost/sessions');
app.use(session({
  secret: 'lzlgreat',
  cookie: {
    maxAge: 604800000 // 7 * 24 * 60 * 60 * 1000 //过期时间，一周
  },
  store: new MongoStore({ // 储存方式: mongodb
    db: 'test',
    mongooseConnection: connect
  }),
  resave: true,
  saveUninitialized: true
}));

// Routes
const controller = require('./controller');
app.use('/', controller('/routes/'));

// redirect all others to the index (HTML5 history)
app.get('*', function(req, res){
  res.render('index.html');
});

// Start server

app.listen(3000, function() {
  console.log("Express server listening on port 3000");
});
