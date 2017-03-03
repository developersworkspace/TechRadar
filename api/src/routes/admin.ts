// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';
import * as jwt from 'jsonwebtoken';

// Imports services
import { BlipService } from './../services/blip';

// Imports models
import { Blip } from './../models/blip';

// Imports configuration
import { config } from './../config';

let router = express.Router();

/**
 * @api {get} /admin/blip/list RETRIEVE LIST OF BLIPS
 * @apiName AdminBlipList
 * @apiGroup AdminBlip
 * 
 * @apiSuccess {Object} response Empty.
 * 
 */
router.get('/blip/list', (req: Request, res: Response, next: Function) => {
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

    blipService.list().then((items: any[]) => {
        let data = {
            quadrants: ["Techniques", "Tools", "Platforms", "Languages & Frameworks"],
            items: items
        };

        res.json(data);
    });
});

/**
 * @api {post} /admin/blip/create CREATE A NEW BLIP
 * @apiName BlipCreate
 * @apiGroup Blip
 * 
 * @apiParam {String} title Empty.
 * @apiParam {String} description Empty.
 * @apiParam {String} quadrant Empty.
 * @apiParam {Number} votes Empty.
 * 
 * @apiSuccess {Boolean} response Empty.
 * 
 */
router.post('/blip/create', (req: Request, res: Response, next: Function) => {
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

    blipService.create(req.body.title, req.body.description, req.body.quadrant, decodedToken.emailAddress, decodedToken.userId).then((result: Blip) => {
        let tasks: Promise<Boolean>[] = [];

        for (let i = 0; i < req.body.votes; i++) {
            let fakeEmailAddress = generateId();
            let fakeUserId = Math.floor(Math.random() * 10000000);

            let task = blipService.upvote(result.id, fakeEmailAddress, fakeUserId);

            tasks.push(task);
        }

        return Promise.all(tasks);
    }).then((result: Boolean[]) => {
        res.json(true);
    });
});


/**
 * @api {post} /admin/blip/delete DELETE A BLIP
 * @apiName BlipDelete
 * @apiGroup Blip
 * 
 * @apiParam {String} id Empty.
 * 
 * @apiSuccess {Boolean} response Empty.
 * 
 */
router.post('/blip/delete', (req: Request, res: Response, next: Function) => {
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

    blipService.delete(req.body.id).then((result: Boolean) => {
        res.json(true);
    });
});

function generateId(): string {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
        + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

export = router;
