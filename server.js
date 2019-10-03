// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// when date_string is empty //
app.get("/api/timestamp/", function(req, res) {
  let date = new Date();
  let utcDate = date.toUTCString();
  res.json({"unix" : date.getTime(), "utc" : utcDate});
});
// when date_string is not empty
//date string is not valid: you can't convert date to milliseconds
//or I could use Invalid Date string
//because timestamp is a string, we check what format it is, if it's milliseconds
//we convert to number first to get the date
//if invalid
app.get("/api/timestamp/:date_string?", function (req, res) {
    let date = Number(req.params.date_string) ? new Date(Number(req.params.date_string)) : new Date(req.params.date_string) ;
    let utcDate = date.toUTCString();

    //!isNaN(date.getTime()) ? res.json({"unix" : date.getTime(), "utc" : utcDate}) : res.json({"unix" : date.getTime(), "utc" : utcDate});
    res.json({"unix" : date.getTime(), "utc" : utcDate});
}) 


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});