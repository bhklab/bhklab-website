require('dotenv').config();
const express = require('express');
const db = require('./database/mongoose')
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 2000;

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));

const router = require('./routes/router.js');
app.use('/api', router);

// build to serve static files.
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: './client/build' });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

function listen(){
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}

// mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, uesCreateIndex: true});
db.connection
    .on('error', console.log)
    .on('disconnected', db.connect)
    .once('open', listen);

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', db.gracefulExit).on('SIGTERM', db.gracefulExit);
