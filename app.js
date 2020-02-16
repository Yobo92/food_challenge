var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
const session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var providersRouter = require('./routes/providers');
var foodsRouter = require('./routes/foods');
var foodServiceRouter = require('./routes/foodService');

var app = express();

//Connecting to MongoDB

mongoose.connect('mongodb://yobo:Yobo1234@ds139523.mlab.com:39523/dw2020t',{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
mongoose.connection.on('open', function() {
  console.log('Connected to dw2020t DB');
});

//Managing cookies

app.use(cookieParser());
app.use(session({
    secret: '@hack@70n_#2020!',
    resave: false,
    saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/providers', providersRouter);
app.use('/login', loginRouter);
app.use('/foods', foodsRouter);
app.use('/foodService', foodServiceRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
