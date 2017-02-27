// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';

// Imports services
import { DataService } from './../services/data';

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
    let dataService = new DataService();

    dataService.create(req.body.title, req.body.description, req.body.quadrant).then((result: Boolean) => {
        res.json(result);
    });
});


export = router;
