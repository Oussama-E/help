const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const usersRouter = require('./routes/users');
const movieRouter = require('./routes/movie');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/movies', movieRouter);

module.exports = app;
