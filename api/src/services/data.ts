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
        }).then((result: any[]) => {
            return this.listVotes().then((listVotesResult: any[]) => {
                for (let i = 0; i < result.length; i ++) {
                    result[i].value = listVotesResult.filter(x => x.id == result[i].id).length;
                }

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

    upvote(id: string, emailAddress: string): Promise<Boolean> {
        return this.hasVote(id, emailAddress).then((hasVoteResult: Boolean) => {
            if (hasVoteResult) {
                return false;
            } else {
                return this.addVote(id, emailAddress).then((addVoteResult: Boolean) => {
                    return true;
                });
            }
        });
    }

    downvote(id: string, emailAddress: string): Promise<Boolean> {
        return this.removeVote(id, emailAddress).then((removeVoteResult: Boolean) => {
            return removeVoteResult;
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
        }).then((result: any) => {
            return this.listVotesById(id).then((listVotesByIdResult: any[]) => {
                result.value = listVotesByIdResult.length;
                return result;
            });
        });
    }

    private listVotes(): Promise<any[]> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');
            return collection.find({})
                .toArray().then((result: any[]) => {
                    db.close();
                    return result;
                });
        });
    }

    private listVotesById(id: string): Promise<any[]> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');
            return collection.find({
                id: id
            })
                .toArray().then((result: any[]) => {
                    db.close();
                    return result;
                });
        });
    }

    private addVote(id: string, emailAddress: string): Promise<Boolean> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');

            return collection.insertOne({
                id: id,
                emailAddress: emailAddress
            }).then((result: any) => {
                db.close();
                return true;
            });
        });
    }

    private removeVote(id: string, emailAddress: string): Promise<Boolean> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');

            return collection.remove({
                id: id,
                emailAddress: emailAddress
            }).then((result: any) => {
                db.close();
                return true;
            });
        });
    }

    private hasVote(id: string, emailAddress: string): Promise<Boolean> {
        let MongoClient = mongo.MongoClient
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');

            return collection.findOne({
                id: id,
                emailAddress: emailAddress
            }).then((result: any) => {
                db.close();
                return result != null;
            });
        }).then((result: any) => {
            let r: Boolean = result;
            return r;
        });
    }

    private getInstanceOfItem(title: string, description: string, quadrant: string): any {
        return {
            id: this.generateId(),
            name: title,
            quadrant: quadrant,
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