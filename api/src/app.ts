// Imports
import express = require("express");
import bodyParser = require('body-parser');

// Imports middleware
import * as cors from 'cors';

// Imports routes
import dataRoute = require('./routes/data');

export class WebApi {

    constructor(private app: express.Express, private port: number) {
        this.configureMiddleware(app);
        this.configureRoutes(app);
    }

    private configureMiddleware(app: express.Express) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cors());
    }

    private configureRoutes(app: express.Express) {
        app.use("/api/data", dataRoute);
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
console.info(`listening on ${port}`);
