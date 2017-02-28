// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

// Imports services
import { DataService } from './../services/data';

// Imports configuration
import { config } from './../config';

let router = express.Router();

/**
 * @api {get} /data RETRIEVE TECH RADAR DATA
 * @apiName Data
 * @apiGroup Data
 * 
 * @apiSuccess {Object} response Empty.
 * 
 */
router.get('/', (req: Request, res: Response, next: Function) => {
    let dataService = new DataService();

    dataService.list().then((items: any[]) => {
        let data = {
            quadrants: ["Techniques", "Tools", "Platforms", "Languages & Frameworks"],
            items: items
        };

        res.json(data);
    });
});

/**
 * @api {post} /data/create CREATE NEW ITEM ON TECH RADAR
 * @apiName DataCreate
 * @apiGroup Data
 * 
 * @apiSuccess {Object} response Empty.
 * 
 */
router.post('/create', (req: Request, res: Response, next: Function) => {
    let token = req.get('jwt');

    if (!token) {
        res.status(401).end();
        return;
    }

    let dataService = new DataService();

    dataService.create(req.body.title, req.body.description, req.body.quadrant).then((result: Boolean) => {
        res.json(result);
    });
});


/**
 * @api {post} /data/upvote UP VOTE
 * @apiName DataUpVote
 * @apiGroup Data
 * 
 * @apiSuccess {Object} response Empty.
 * 
 */
router.post('/upvote', (req: Request, res: Response, next: Function) => {
    let token = req.get('jwt');

    if (!token) {
        res.status(401).end();
        return;
    }

    let decodedToken: any = null;

    try {
        decodedToken = jwt.verify(token, config.oauth.jwtSecret, {
            issuer: config.oauth.jwtIssuer
        });
    } catch (err) {
        res.status(401).end();
        return;
    }

    let dataService = new DataService();

    dataService.upvote(req.body.id, decodedToken.emailAddress).then((result: Boolean) => {
        res.json(result);
    });
});

/**
 * @api {post} /data/downvote DOWN VOTE
 * @apiName DataDownVote
 * @apiGroup Data
 * 
 * @apiSuccess {Object} response Empty.
 * 
 */
router.post('/downvote', (req: Request, res: Response, next: Function) => {
    let token = req.get('jwt');

    if (!token) {
        res.status(401).end();
        return;
    }

    let decodedToken: any = null;

    try {
        decodedToken = jwt.verify(token, config.oauth.jwtSecret, {
            issuer: config.oauth.jwtIssuer
        });
    } catch (err) {
        res.status(401).end();
        return;
    }

    let dataService = new DataService();

    dataService.downvote(req.body.id, decodedToken.emailAddress).then((result: Boolean) => {
        res.json(result);
    });
});

export = router;
