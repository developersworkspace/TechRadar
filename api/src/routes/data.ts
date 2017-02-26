// Imports
import { Express, Request, Response } from "express";
import * as express from 'express';

// Imports services


let router = express.Router();

/**
 * @api {get} /data RETRIEVE LIST OF DATA
 * @apiName Data
 * @apiGroup Data
 * 
 * @apiSuccess {Object} response Empty.
 * 
 */
router.get('/', function (req: Request, res: Response, next: Function) {
    res.json(getSampleData());
});


function getSampleData() {

    let data = {
        quadrants: [],
        items: []
    };

    data.quadrants.push("Techniques");
    data.quadrants.push("Tools");
    data.quadrants.push("Platforms");
    data.quadrants.push("Languages and Frameworks");


    let numberOfItems = 20;

    let randomData = [
        'Redis',
        'Mongo',
        'CouchDB',
        'SQL',
        'Micro Services',
        'Node JS',
        'Angular 2',
        'C#',
        'D3',
        'Cloud',
        'Automation',
        'Continous Delivery'
    ];

    data.items = [];

    for (let i = 0; i < Math.round(Math.random() * numberOfItems); i++) {

        let angle = Math.random() * 90;

        let name = randomData[Math.floor(Math.random() * randomData.length)];

        data.items.push({
            name: name,
            quadrant: "Techniques",
            value: Math.random() * 100,
            angle: angle
        });
    }

    for (let i = 0; i < Math.round(Math.random() * numberOfItems); i++) {

        let angle = Math.random() * 90;

        let name = randomData[Math.floor(Math.random() * randomData.length)];

        data.items.push({
            name: name,
            quadrant: "Tools",
            value: Math.random() * 100,
            angle: angle
        });
    }

    for (let i = 0; i < Math.round(Math.random() * numberOfItems); i++) {

        let angle = Math.random() * 90;

        let name = randomData[Math.floor(Math.random() * randomData.length)];

        data.items.push({
            name: name,
            quadrant: "Platforms",
            value: Math.random() * 100,
            angle: angle
        });
    }

    for (let i = 0; i < Math.round(Math.random() * numberOfItems); i++) {

        let angle = Math.random() * 90;

        let name = randomData[Math.floor(Math.random() * randomData.length)];

        data.items.push({
            name: name,
            quadrant: "Languages and Frameworks",
            value: Math.random() * 100,
            angle: angle
        });
    }

    return data;
}

export = router;
