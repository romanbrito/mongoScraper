// Dependencies

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

// Set up Express app
var app = express();
app.set('port', process.env.PORT || 8080);
// static content
app.use(express.static(process.cwd() + '/public'));

// Set up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// handlebars
var exphbs = require('express-handlebars');
var hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: [
        'views/partials'
    ]
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
// app.use(require('./controllers'));
app.use(require('./routes/main'));
app.use(require('./routes/scrape'));

// MONGOOSE

// hook mongoose with our mongodb database
mongoose.connect("mongodb://localhost/scraper");
mongoose.Promise = Promise;

// save our mongoose connection to db
var db = mongoose.connection;

// if error log it to console
db.on("error", function (error) {
    console.log("mongoose Error: ", error);
});

// open connection to mongoose and start server
db.once("open", function () {
    var server = app.listen(app.get('port'), function () {
        console.log('Listening on port ' + app.get('port'));
        console.log("Mongoose connection successful.");
    });
});
