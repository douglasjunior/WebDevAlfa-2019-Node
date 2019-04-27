const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const validator = require('express-validator');

const routes = require('./routes');
const customValidators = require('./utils/customValidators');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(validator({
    customValidators
}))

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err);

    const message = err.message;
    const error = req.app.get('env') === 'development' ? err : {};
    const statusCode = err.status || 500;

    res.status(statusCode)
        .json({
            message,
            error
        });
});

module.exports = app;
