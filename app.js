var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash');
var session = require('express-session');
var passport = require('passport');

var layouts = require('express-ejs-layouts')

var indexRouter = require('./routes/index');
var eventRouter = require('./routes/events');
var locationRouter= require('./routes/locations');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');
var registerRouter = require('./routes/register');
var registerInstitutionRouter = require('./routes/register_institution');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', './layout');
const login = require("./funkcije/Login");
login.initialize(passport);

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
app.use(flash());
app.use(session({
  secret:"ZaraZara",
  resave:false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/events', eventRouter);
app.use('/locations', locationRouter);
app.use('/profile', profileRouter);
app.use('/register', registerRouter);
app.use('/registerInstitution', registerInstitutionRouter);

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
  res.redirect('/');
});

module.exports = app;
