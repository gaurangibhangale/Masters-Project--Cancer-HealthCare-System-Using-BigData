
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , meher = require('./routes/meher')
  , gaurangi = require('./routes/gaurangi')
  , hanifa = require('./routes/hanifa')
  , http = require('http')
  , path = require('path')
  , crypto = require('crypto')
//  , Chance = require('chance')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , fs = require('fs');
var flash = require('connect-flash');

var app = express();
//var connection = require('express-myconnection');
var sess = null;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(session({secret : 'ssshhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser({keepExtensions : true}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.use(flash());

app.get('/', routes.index);
app.get('/users', user.list);

//signup and signin --->meher
app.get('/signin',meher.signin);
app.get('/signup',meher.signup);
app.post('/signup',meher.saveUser);
app.post('/signin',meher.signindo);
app.get('/signout',meher.signout);
app.get('/screening',meher.screening);
app.post('/screening',meher.screeningSubmit);
app.get('screeningResult',meher.screeningResult);

//Gaurangi javascript
//home page and track symptoms
app.get('/trackSymptoms',gaurangi.tracksymptoms);
app.get('/ViewHistory', gaurangi.viewhistory);
app.post('/addSymptoms',gaurangi.addSymptoms);
//contactus and about us
app.get('/contact-us',gaurangi.contactus);
app.get('/about-us',gaurangi.aboutus);
//cancer information
app.get('/bladder-cancer',gaurangi.bladder);
app.get('/breast-cancer',gaurangi.breast);
app.get('/colorectal-cancer',gaurangi.colorectal);
app.get('/lung-cancer',gaurangi.lung);
app.get('/prostate-cancer',gaurangi.prostate);
app.get('/vulvar-cancer',gaurangi.vulvar);
app.get('/visualization',gaurangi.visualization);
//cancer taxanomy
app.get('/taxanomy',hanifa.taxanomy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

