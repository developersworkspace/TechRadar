// Imports
import * as mongo from 'mongodb';
import { Db } from 'mongodb';

export class DataService {

    url = 'mongodb://mongo:27017/techradar';

    constructor() {

    }

    list(): Promise<any[]> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(this.url).then((db: Db) => {
            let collection = db.collection('items');

            return collection.find({}).toArray().then((result: any[]) => {
                db.close();
                return result;
            });
        });
    }

    create(title: string, description: string, quadrant: string): Promise<Boolean> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(this.url).then((db: Db) => {
            let collection = db.collection('items');

            return collection.insertOne(this.getInstanceOfItem(title, description, quadrant)).then((result: any) => {
                db.close();
                return true;
            });
        });
    }

    find(id: string): Promise<any> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(this.url).then((db: Db) => {
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