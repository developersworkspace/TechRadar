// Imports
import * as mongo from 'mongodb';
import { Db } from 'mongodb';

// Imports models
import { Blip } from './../models/blip';
import { Vote } from './../models/vote';

// Imports configuration
import { config } from './../config';

export class BlipService {


    constructor(private mongoClient: mongo.MongoClient) {

    }

    public clean() {
        let database: Db = null;

        return this.mongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            database = db;

            let collection = database.collection('blips');
            return collection.remove({});
        }).then((result: any) => {
            let collection = database.collection('votes');
            return collection.remove({});
        }).then((result: any) => {
            database.close();
        });
    }

    public list(): Promise<Blip[]> {
        return this.mongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('blips');
            return collection.find({}).toArray()
                .then((result: Blip[]) => {
                    db.close();
                    return result;
                });
        }).then((result: Blip[]) => {
            return result.map(x => new Blip(x.name, x.description, x.quadrant, x.creator, x.userId).setId(x.id).setAngle(x.angle).setTimestamp(x.timestamp));
        }).then((listIBlipsResult: Blip[]) => {
            return this.listVotes().then((listVotesResult: Vote[]) => {
                return listIBlipsResult.map(x => x.setValue(listVotesResult));
            });
        });
    }

    public create(title: string, description: string, quadrant: string, emailAddress: string, userId: number): Promise<Blip> {
        if (this.isEmpty(title) || this.isEmpty(description) || this.isEmpty(quadrant) || this.isEmpty(emailAddress) || this.isEmpty(userId)) {
            console.log(userId);
            return Promise.resolve(null);
        }

        return this.findByTitle(title).then((result: Blip) => {
            if (result == null) {
                let blip = new Blip(title, description, quadrant, emailAddress, userId);
                return this.mongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
                    let collection = db.collection('blips');
                    return collection.insertOne(blip)
                        .then((result: any) => {
                            db.close();
                            return blip;
                        });
                });
            } else {
                return null;
            }
        }).then((result: Blip) => {
            return result;
        });
    }

    public delete(id: string): Promise<Boolean> {
        return this.mongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('blips');
            return collection.remove({
                id: id
            }).then((result: mongo.WriteOpResult) => {
                db.close();
                return result;
            });
        }).then((result: mongo.WriteOpResult) => {
            if (result.result.n == 0) {
                return false;
            }

            return this.removeVotes(id).then((result: Boolean) => {
                return true;
            });
        }).then((result: Boolean) => {
            return result;
        });
    }

    public upvote(id: string, emailAddress: string, userId: number): Promise<Boolean> {
        return this.removeVote(id, emailAddress, userId).then((removeVoteResult: Boolean) => {
            return this.addVote(id, emailAddress, userId, true);
        }).then((addVoteResult: Boolean) => {
            return addVoteResult;
        });
    }

    public downvote(id: string, emailAddress: string, userId: number): Promise<Boolean> {
        return this.removeVote(id, emailAddress, userId).then((removeVoteResult: Boolean) => {
            return this.addVote(id, emailAddress, userId, false);
        }).then((addVoteResult: Boolean) => {
            return addVoteResult;
        });
    }

    public find(id: string): Promise<Blip> {
        return this.mongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('blips');
            return collection.findOne({
                id: id
            }).then((result: any) => {
                db.close();
                return result;
            });
        }).then((result: any) => {
            return new Blip(result.name, result.description, result.quadrant, result.creator, result.userId).setId(result.id).setAngle(result.angle).setTimestamp(result.timestamp);
        }).then((result: Blip) => {
            return this.listVotesById(id).then((listVotesByIdResult: Vote[]) => {
                return result.setValue(listVotesByIdResult);
            });
        });
    }

    private isEmpty(str) {
        return (!str || 0 === str.length);
    }

    private findByTitle(title: string) {
        return this.mongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('blips');
            return collection.findOne({
                name: title
            }).then((result: any) => {
                db.close();
                return result;
            });
        }).then((result: any) => {
            if (result == null)
                return null;

            return new Blip(result.name, result.description, result.quadrant, result.creator, result.userId).setId(result.id).setAngle(result.angle).setTimestamp(result.timestamp);
        }).then((result: Blip) => {
            if (result == null)
                return null;

            return this.listVotesById(result.id).then((listVotesByIdResult: Vote[]) => {
                return result.setValue(listVotesByIdResult);
            });
        });
    }

    private listVotes(): Promise<Vote[]> {
        return this.mongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');
            return collection.find({}).toArray()
                .then((result: Vote[]) => {
                    db.close();
                    return result;
                });
        }).then((result: Vote[]) => {
            return result.map(x => new Vote(x.id, x.emailAddress, x.userId, x.isUpVote));
        });
    }

    private listVotesById(id: string): Promise<Vote[]> {
        return this.mongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');
            return collection.find({
                id: id
            }).toArray()
                .then((result: Vote[]) => {
                    db.close();
                    return result;
                });
        }).then((result: Vote[]) => {
            return result.map(x => new Vote(x.id, x.emailAddress, x.userId, x.isUpVote));
        });
    }

    private addVote(id: string, emailAddress: string, userId: number, isUpVote: Boolean): Promise<Boolean> {
        return this.mongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
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

    private removeVotes(id: string): Promise<Boolean> {
        return this.mongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
            let collection = db.collection('votes');

            return collection.remove({
                id: id
            }).then((result: mongo.WriteOpResult) => {
                db.close();
                return result.result.n == 0 ? false : true;
            });
        });
    }

    private removeVote(id: string, emailAddress: string, userId: number): Promise<Boolean> {
        return this.mongoClient.connect(config.datastores.mongo.uri).then((db: Db) => {
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