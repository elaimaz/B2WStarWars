const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const config = require('./utils/config');
const logger = require('./utils/logger');
const planetsRouter = require('./controllers/planets');
const midlleware = require('./utils/middleware');

logger.info('connecting to', config.MONGODB_URI);

( async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error('Cannot connect to MongoDB', error);
    }
})();

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(midlleware.requestLogger);

app.use('/api/planets', planetsRouter);

app.use(midlleware.unknownEndPoint);
app.use(midlleware.errorHandler);

module.exports = app;
