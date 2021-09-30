// import packages
import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import TronWeb from 'tronweb';
import ip from 'ip';
import fs from 'fs';

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
const bcrypt = require('bcrypt');

var cookieParser = require('cookie-parser');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const serverPort = require('./utils/config-wrapper').serverPort || process.env.PORT;
const corsPort = require('./utils/config-wrapper').corsPort;
const mongoosePort = require('./utils/config-wrapper').mongoosePort;
const databaseName = require('./utils/config-wrapper').databaseName;

var myip = ip.address();

// config
import config from './config/config';
import { resolveAny } from 'dns';

// Tronweb Init
const tronWeb = new TronWeb({
    fullHost: 'https://api.shasta.trongrid.io'
})

// MongoDB Config

const db = mongoose.connect(`mongodb://localhost:${mongoosePort}/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>
    console.log('MongoDB successfully connected.')
).catch(err => console.log("mongo connection error: "+err));


// Express Config

const app = express();

// compress responses

// app.options('*', cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

//ENABLE CORS
app.use(cors({
    origin: `http://localhost:${corsPort}`,
    exposedHeaders: ['X-Access-Token'],
}));

///---------///

const corsVerify = (req, res, next) => {

    try {
        var origin = req.headers['origin'];
        if (origin == "https://intercroneswap.finance") {
            next()
        } else {
            return res.status(400).json({
                errmessage: "authorization required.",
            });
        }


    } catch (err) {
        console.log(err, 'MMMMMM')
        return res.status(400).json({
            errmessage: "authorization required.",
        });

    }
}

// app.use("/api",corsVerify, admin);

///---------///

// const allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// };
// app.use(allowCrossDomain);


//Make server

var privateKey = fs.readFileSync(__dirname + '/sslkeys/iswap.key', 'utf8');
var certificate = fs.readFileSync(__dirname + '/sslkeys/iswap.pem', 'utf8');

var credentials = { key: privateKey, cert: certificate, requestCert: false };

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.HTTPPORT || '4000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var httpserver = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

if (process.env.NODE_ENV === 'production') {
    httpsServer.listen(serverPort || '4000', () => console.log(`API server listening on port ${serverPort}`));
} else {
    app.listen(serverPort || '4000', () => console.log(`API server listening on port ${serverPort}`));
}


//Base URL View
app.get('/', (req, res) => {
    return res.send("ISwap API Working...")
})

// import routes
require('./alloldroutes')(app);
//import cron from './cronjob';
import marketdata from './tronapi/marketdata.js';
// Export the Server Middleware

module.exports = {
    path: '/api',
    handler: app
}