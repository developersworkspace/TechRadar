// Imports
import * as mongo from 'mongodb';
import { Db } from 'mongodb';

// Imports configuration
import { config } from './../config';

export class DataService {

    constructor() {

    }

    list(): Promise<any[]> {
        let MongoClient = mongo.MongoClient;
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('items');

            return collection.find({}).toArray().then((result: any[]) => {
                db.close();
                return result;
            });
        }).then((result: any[]) => {
            return this.listVotes().then((listVotesResult: any[]) => {
                for (let i = 0; i < result.length; i++) {
                    let value = listVotesResult.filter(x => x.id == result[i].id && x.isUpVote).length - listVotesResult.filter(x => x.id == result[i].id && !x.isUpVote).length;

                    if (value < 0) {
                        value = 0;
                    }

                    if (value > 100) {
                        value = 100;
                    }
                    
                    result[i].value = value;
                }
                return result;
            });
        });
    }

    create(title: string, description: string, quadrant: string, emailAddress: string): Promise<Boolean> {
        let MongoClient = mongo.MongoClient;
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('items');

            return collection.insertOne(this.getInstanceOfItem(title, description, quadrant, emailAddress)).then((result: any) => {
                db.close();
                return true;
            });
        });
    }

    upvote(id: string, emailAddress: string): Promise<Boolean> {
        return this.removeVote(id, emailAddress).then((removeVoteResult: Boolean) => {
            return this.addVote(id, emailAddress, true);
        }).then((addVoteResult: Boolean) => {
            return addVoteResult;
        });
    }

    downvote(id: string, emailAddress: string): Promise<Boolean> {
        return this.removeVote(id, emailAddress).then((removeVoteResult: Boolean) => {
            return this.addVote(id, emailAddress, false);
        }).then((addVoteResult: Boolean) => {
            return addVoteResult;
        });
    }

    find(id: string): Promise<any> {
        let MongoClient = mongo.MongoClient;
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
        let MongoClient = mongo.MongoClient;
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
        let MongoClient = mongo.MongoClient;
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

    private addVote(id: string, emailAddress: string, isUpVote: Boolean): Promise<Boolean> {
        let MongoClient = mongo.MongoClient;
        return MongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');

            return collection.insertOne({
                id: id,
                emailAddress: emailAddress,
                isUpVote: isUpVote
            }).then((result: any) => {
                db.close();
                return true;
            });
        });
    }

    private removeVote(id: string, emailAddress: string): Promise<Boolean> {
        let MongoClient = mongo.MongoClient;
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

    private getInstanceOfItem(title: string, description: string, quadrant: string, emailAddress: string): any {
        return {
            id: this.generateId(),
            name: title,
            quadrant: quadrant,
            angle: this.generateAngle(),
            description: description,
            creator: emailAddress,
            timestamp: Date.now()
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