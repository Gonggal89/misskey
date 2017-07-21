"use strict";
/**
 * Web Server
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const ms = require("ms");
// express modules
const express = require("express");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const compression = require("compression");
const conf_1 = require("../conf");
/**
 * Init app
 */
const app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
    type: ['application/json', 'text/plain']
}));
app.use(compression());
/**
 * Initialize requests
 */
app.use((req, res, next) => {
    res.header('X-Frame-Options', 'DENY');
    next();
});
/**
 * Static assets
 */
app.use(favicon(`${__dirname}/assets/favicon.ico`));
app.get('/manifest.json', (req, res) => res.sendFile(`${__dirname}/assets/manifest.json`));
app.get('/apple-touch-icon.png', (req, res) => res.sendFile(`${__dirname}/assets/apple-touch-icon.png`));
app.use('/assets', express.static(`${__dirname}/assets`, {
    maxAge: ms('7 days')
}));
/**
 * Common API
 */
app.get(/\/api:url/, require('./service/url-preview'));
/**
 * Serve config
 */
app.get('/config.json', (req, res) => {
    res.send({
        recaptcha: {
            siteKey: conf_1.default.recaptcha.siteKey
        }
    });
});
/**
 * Routing
 */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(`${__dirname}/app/base.html`), {
        maxAge: ms('7 days')
    });
});
module.exports = app;
