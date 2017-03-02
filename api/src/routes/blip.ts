// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

// Imports services
import { BlipService } from './../services/blip';

// Imports configuration
import { config } from './../config';

let router = express.Router();

/**
 * @api {get} /blip/list RETRIEVE LIST OF BLIPS
 * @apiName BlipList
 * @apiGroup Blip
 * 
 * @apiSuccess {Object} response Empty.
 * 
 */
router.get('/list', (req: Request, res: Response, next: Function) => {
    let blipService = new BlipService();

    blipService.list().then((items: any[]) => {
        let data = {
            quadrants: ["Techniques", "Tools", "Platforms", "Languages & Frameworks"],
            items: items
        };

        res.json(data);
    });
});

/**
 * @api {post} /blip/create CREATE A NEW BLIP
 * @apiName BlipCreate
 * @apiGroup Blip
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

    let decodedToken: any = null;

    try {
        decodedToken = jwt.verify(token, config.oauth.jwtSecret, {
            issuer: config.oauth.jwtIssuer
        });
    } catch (err) {
        res.status(401).end();
        return;
    }

    let blipService = new BlipService();

    blipService.create(req.body.title, req.body.description, req.body.quadrant, decodedToken.emailAddress, decodedToken.userId).then((result: Boolean) => {
        res.json(result);
    });
});


/**
 * @api {post} /blip/upvote UP VOTE A BLIP
 * @apiName BlipUpVote
 * @apiGroup Blip
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

    let blipService = new BlipService();

    blipService.upvote(req.body.id, decodedToken.emailAddress, decodedToken.userId).then((result: Boolean) => {
        res.json(result);
    });
});

/**
 * @api {post} /blip/downvote DOWN VOTE A BLIP
 * @apiName BlipDownVote
 * @apiGroup Blip
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

    let blipService = new BlipService();

    blipService.downvote(req.body.id, decodedToken.emailAddress, decodedToken.userId).then((result: Boolean) => {
        res.json(result);
    });
});

export = router;
