var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var velocity = require('velocityjs');
var fs = require('fs');    
var cwd = process.cwd();


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', express.static('public'));

app.engine('html',function(path,options,fn){  
        var template = fs.readFileSync(path).toString();  
        var macros = {  
            parse: function(file) {  

                var template = fs.readFileSync(cwd + '/' + file).toString();   
                return this.eval(template);  
            }  
        }  
        try{  console.log("2222222"+template);
            fn(null, velocity.render(template, options, macros))  
        }catch(err){  
            console.log(err);  
            fn(err)  
        }  
});


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(8102,function(){
  console.log('Server start');
});
module.exports = app;
