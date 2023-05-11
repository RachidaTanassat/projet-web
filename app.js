var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var categoriesRouter = require('./routes/categories');
var commentairesRouter = require('./routes/commentaires');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);
app.use('/commentaires', commentairesRouter);

module.exports = app;
