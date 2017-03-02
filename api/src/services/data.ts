// Imports
import * as mongo from 'mongodb';
import { Db } from 'mongodb';

// Imports models
import { Item } from './../models/item';
import { Vote } from './../models/vote';

// Imports configuration
import { config } from './../config';

export class DataService {

    constructor() {

    }

    list(): Promise<Item[]> {
        let MongoClient = mongo.MongoClient;
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('items');
            return collection.find({}).toArray()
        }).then((result: Item[]) => {
            return result.map(x => new Item(x.name, x.description, x.quadrant, x.creator, x.userId).setId(x.id).setAngle(x.angle).setTimestamp(x.timestamp));
        }).then((listItemsResult: Item[]) => {
            return this.listVotes().then((listVotesResult: Vote[]) => {
                return listItemsResult.map(x => x.setValue(listVotesResult));
            });
        });
    }

    create(title: string, description: string, quadrant: string, emailAddress: string, userId: number): Promise<Boolean> {
        let MongoClient = mongo.MongoClient;
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('items');
            return collection.insertOne(new Item(title, description, quadrant, emailAddress, userId)).then((result: any) => {
                db.close();
                return true;
            });
        });
    }

    upvote(id: string, emailAddress: string, userId: number): Promise<Boolean> {
        return this.removeVote(id, emailAddress, userId).then((removeVoteResult: Boolean) => {
            return this.addVote(id, emailAddress, userId, true);
        }).then((addVoteResult: Boolean) => {
            return addVoteResult;
        });
    }

    downvote(id: string, emailAddress: string, userId: number): Promise<Boolean> {
        return this.removeVote(id, emailAddress, userId).then((removeVoteResult: Boolean) => {
            return this.addVote(id, emailAddress, userId, false);
        }).then((addVoteResult: Boolean) => {
            return addVoteResult;
        });
    }

    find(id: string): Promise<Item> {
        let MongoClient = mongo.MongoClient;
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('items');
            return collection.findOne({
                id: id
            });
        }).then((result: any) => {
            return new Item(result.name, result.description, result.quadrant, result.creator, result.userId).setId(result.id).setAngle(result.angle).setTimestamp(result.timestamp);
        }).then((result: Item) => {
            return this.listVotesById(id).then((listVotesByIdResult: Vote[]) => {
                return result.setValue(listVotesByIdResult);
            });
        });
    }

    private listVotes(): Promise<Vote[]> {
        let MongoClient = mongo.MongoClient;
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');
            return collection.find({}).toArray().then((result: Vote[]) => {
                return result.map(x => new Vote(x.id, x.emailAddress, x.userId, x.isUpVote));
            });
        });
    }

    private listVotesById(id: string): Promise<Vote[]> {
        let MongoClient = mongo.MongoClient;
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');
            return collection.find({
                id: id
            }).toArray().then((result: Vote[]) => {
                return result.map(x => new Vote(x.id, x.emailAddress, x.userId, x.isUpVote));
            });
        });
    }

    private addVote(id: string, emailAddress: string, userId: number, isUpVote: Boolean): Promise<Boolean> {
        let MongoClient = mongo.MongoClient;
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');

            return collection.insertOne({
                id: id,
                emailAddress: emailAddress,
                isUpVote: isUpVote,
                userId: userId
            }).then((result: any) => {
                db.close();
                return true;
            });
        });
    }

    private removeVote(id: string, emailAddress: string, userId: number): Promise<Boolean> {
        let MongoClient = mongo.MongoClient;
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');

            return collection.remove({
                id: id,
                emailAddress: emailAddress,
                userId: userId,
            }).then((result: any) => {
                db.close();
                return true;
            });
        });
    }

}