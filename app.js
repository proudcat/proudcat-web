/**
 * Created by 于小懒 on 10/20/15.
 */

//third party module
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//self module
var json = require('./json/json.js');//do not delete this line!!
var db = require('./db/mongo.js');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

// parse application/json
app.use(bodyParser.json());

// this will let us get the data from a POST
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//set url router
app.use('/product', require('./routes/product'));

app.use('/', function (req, res, next) {
    console.log('Request Type:', req.method);
    console.log('Request Body:', req.body);
    console.log('Request PARAM:', req.params);
    next(req, res);
});

// error handlers

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);

        var result = new JsonResult();
        result.errors = err;
        res.json(result);
    });
}

// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {

    res.status(err.status || 500);

    var result = new JsonResult();
    result.errors.push({
        "code": err.status,
        "message": err.message
    });
    res.json(result);
});


// connect db & start web server
var port = process.env.PORT || 8080;

//connect mongodb
db.connect(function () {

    //start web server
    app.listen(port);

    console.log('Magic happens on port ', port);
});

