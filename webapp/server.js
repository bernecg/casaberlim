/*var express = require('express');
var app = express();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

app.get('/SevenWonders', function(req, res) {
    var items = [
        {name:'Giza Necropolis', localtion:'Giza, Egypt'},
        {name:'Giza 2', localtion:'Giza, 2'},
        {name:'Giza 3', localtion:'Giza, 3'},
        {name:'Giza 4', localtion:'Giza, 4'},
        {name:'Giza 5', localtion:'Giza, 5'},
        {name:'Giza 6', localtion:'Giza, 6'}
    ];
    res.send(items);
});

app.listen(4000);
console.log('Listening on port 4000');*/

// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 8081;//process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.post('/', function(req, res) {
    res.json({ message: 'Yay! Post worked too!' });
    console.log(req);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
