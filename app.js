const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const offerRouter = require('./api/v1/routes/OfferRouter');
const tenderRouter = require('./api/v1/routes/TenderRouter');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/offer', offerRouter);
app.use('/api/v1/tender', tenderRouter);

module.exports = app;
