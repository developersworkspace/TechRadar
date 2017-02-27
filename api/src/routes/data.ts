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


    let techniquesData = ["Git flow / Pull Requests", "Incremental data warehousing", "Events for messages - CQRS", "Measure Pipeline disruptions", "Continuous Experimentation", "Reduce iRules dependence", "SaaS for non-core systems", "Pair Programming", "iOS Accessibility", "Single Page App", "iOS Adaptivity", "Build Pipelines", "Data Informed Decion Making", "Polygot Programming", "internal load balancing off F5", "Isolated dev envs", "Edge Services"];

    let toolsData = ["Docker", "bind", "Appium", "Android Studio", "Responsive Android", "AutoLayout - iOS", "Kiwi - iOS unit test", "BEM", "Crashlytics", "Consul", "Swagger Code-Gen", "PowerMock", "Mockito", "Json Web Tokens (JWT)", "Lemming", "Hystrix"];

    let platformsData = ["OpenId Connect", "Location based services", "Openstack", "RHEL 7", "App containers", "Google Cloud Data Flow", "Postgres as NoSQL", "AWS 2014 Innovations", "Azure", "Mesos", "Marathon", "Kubernetes", "Google App Engine", "Google as corporate platform", "Google Play - (alpha/beta builds)"];

    let languagesFrameworksData = ["CDI", "Jersey", "Guice", "RxJava", "Java 8", "Groovy", "Swift", "Scala - the good parts", "Serverside Javascript", "Coffeescript", "Functional Reactive Programming", "Clojure", "RxJs", "Web Components", "Mustache/Handlebars template"];


    let d1 = techniquesData.map(x => {
        return {
            id: guid(),
            name: x,
            quadrant: "Techniques",
            value: Math.random() * 100,
            angle: Math.random() * 90
        };
    });

    let d2 = toolsData.map(x => {
        return {
            id: guid(),
            name: x,
            quadrant: "Tools",
            value: Math.random() * 100,
            angle: Math.random() * 90
        };
    });


    let d3 = platformsData.map(x => {
        return {
            id: guid(),
            name: x,
            quadrant: "Platforms",
            value: Math.random() * 100,
            angle: Math.random() * 90
        };
    });

    let d4 = languagesFrameworksData.map(x => {
        return {
            id: guid(),
            name: x,
            quadrant: "Languages and Frameworks",
            value: Math.random() * 100,
            angle: Math.random() * 90
        };
    });

    data.items = d1.concat(d2).concat(d3).concat(d4);

    return data;
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export = router;
