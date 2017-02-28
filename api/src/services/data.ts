// Imports
import * as mongo from 'mongodb';
import { Db } from 'mongodb';

// Imports configuration
import { config } from './../config';

export class DataService {

    constructor() {

    }

    list(): Promise<any[]> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('items');

            return collection.find({}).toArray().then((result: any[]) => {
                db.close();
                return result;
            });
        });
    }

    create(title: string, description: string, quadrant: string): Promise<Boolean> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('items');

            return collection.insertOne(this.getInstanceOfItem(title, description, quadrant)).then((result: any) => {
                db.close();
                return true;
            });
        });
    }

    upvote(id: string): Promise<any> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            return this.find(id).then((item: any) => {
                let collection = db.collection('items');
                let newValue = item.value + 2;

                if (newValue > 100) {
                    newValue = 100;
                }

                return collection.updateOne({
                    id: id
                }, {
                        $set: {
                            value: newValue
                        }
                    }).then((result: any) => {
                        return true;
                    });
            });
        });
    }

    downvote(id: string): Promise<any> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            return this.find(id).then((item: any) => {
                let collection = db.collection('items');
                let newValue = item.value - 2;

                if (newValue < 0) {
                    newValue = 0;
                }

                return collection.updateOne({
                    id: id
                }, {
                        $set: {
                            value: newValue
                        }
                    }).then((result: any) => {
                        return true;
                    });
            });
        });
    }

    find(id: string): Promise<any> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('items');

            return collection.findOne({
                id: id
            }).then((result: any) => {
                db.close();
                return result;
            });
        });
    }

    private getInstanceOfItem(title: string, description: string, quadrant: string): any {
        return {
            id: this.generateId(),
            name: title,
            quadrant: quadrant,
            value: 0,
            angle: this.generateAngle(),
            description: description
        };
    }

    private generateAngle(): number {
        return Math.random() * 90
    }

    private generateId(): string {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + '-' + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
            + Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
}