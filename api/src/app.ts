// Imports
import express = require("express");
import bodyParser = require('body-parser');
import expressWinston = require('express-winston');

// Imports middleware
import * as cors from 'cors';

// Imports routes
import blipRoute = require('./routes/blip');
import oauthRoute = require('./routes/oauth');

// Imports logger
import { logger } from './logger';

export class WebApi {

    constructor(private app: express.Express, private port: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }

    private configureMiddleware(app: express.Express) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cors());
        app.use(expressWinston.logger({
            winstonInstance: logger,
            meta: false,
            msg: 'HTTP Request: {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}'
        }));
    }

    private configureRoutes(app: express.Express) {
        app.use("/api/blip", blipRoute);
        app.use("/api/oauth", oauthRoute);
    }

    public getApp() {
        return this.app;
    }

    public run() {
        this.app.listen(this.port);
    }
}


let port = 3000;
let api = new WebApi(express(), port);
api.run();
logger.info(`Listening on ${port}`);
