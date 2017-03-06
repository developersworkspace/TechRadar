// Imports
import 'mocha';
import { expect } from 'chai';

// Imports mocks
import * as mongodb from 'mongo-mock';

// Imports services
import { BlipService } from './../../../api/src/services/blip';

// Imports models
import { Blip } from './../../../api/src/models/blip';

describe('BlipService', () => {

    let blipService: BlipService = null;

    beforeEach(() => {
        mongodb.max_delay = 0;
        let mongoClient = mongodb.MongoClient;

        blipService = new BlipService(mongoClient);

        return blipService.clean().then((result: any) => {
            return blipService.create('Consul', 'New Tech', 'Tools', 'hello@example.com', 1);
        }).then((result: Blip) => {
            if (result == null) {
                return false;
            }
            return blipService.upvote(result.id, 'hello@example.com', 2);
        }).then((result: Boolean) => {
            return blipService.create('Docker', 'New Tech', 'Tools', 'hello@example.com', 2);
        })
    })

    describe('list', () => {
        it('should return array of Blip', () => {
            return blipService.list().then((result: Blip[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.equal(2);
            });
        });
    });

    describe('create', () => {
        it('should return blip', () => {
            return blipService.create('Mongo', 'Hello World', 'Tools', 'hello@example.com', 1).then((result: Blip) => {
                expect(result).to.be.not.null;
                expect(result.id).to.be.not.null;
            });
        });

        it('should return null given existing title', () => {
            return blipService.create('Consul', 'Hello World', 'Tools', 'hello@example.com', 1).then((result: Blip) => {
                expect(result).to.be.null;
            });
        });

        it('should return null given null as title', () => {
            return blipService.create(null, 'Hello World', 'Tools', 'hello@example.com', 1).then((result: Blip) => {
                expect(result).to.be.null;
            });
        });

        it('should return null given null as description', () => {
            return blipService.create('Mongo', null, 'Tools', 'hello@example.com', 1).then((result: Blip) => {
                expect(result).to.be.null;
            });
        });

        it('should return null given null as quadrant', () => {
            return blipService.create('Mongo', 'Hello World', null, 'hello@example.com', 1).then((result: Blip) => {
                expect(result).to.be.null;
            });
        });

        it('should return null given null as email address', () => {
            return blipService.create('Mongo', 'Hello World', 'Tools', null, 1).then((result: Blip) => {
                expect(result).to.be.null;
            });
        });

        it('should return null given null as user id', () => {
            return blipService.create('Mongo', 'Hello World', 'Tools', 'hello@example.com', null).then((result: Blip) => {
                expect(result).to.be.null;
            });
        });
    });

    describe('delete', () => {
        it('should return true given existing blip id', () => {
            return blipService.list().then((result: Blip[]) => {
                return blipService.delete(result[0].id);
            }).then((result: Boolean) => {
                expect(result).to.be.true;
            });
        });

        it('should return false given non-existing blip id', () => {
            return blipService.delete('111-111-111-111')
                .then((result: Boolean) => {
                    expect(result).to.be.false;
                });
        });
    });

    describe('upvote', () => {
        it('should return true given existing blip id', () => {
            return blipService.list().then((result: Blip[]) => {
                return blipService.upvote(result[0].id, 'hello@example.com', 1);
            }).then((result: Boolean) => {
                expect(result).to.be.true;
            });
        });
    });

    describe('downvote', () => {
        it('should return true given existing blip id', () => {
            return blipService.list().then((result: Blip[]) => {
                return blipService.downvote(result[0].id, 'hello@example.com', 1);
            }).then((result: Boolean) => {
                expect(result).to.be.true;
            });
        });
    });

    describe('find', () => {
        it('should return blip given existing blip id', () => {
            return blipService.list().then((result: Blip[]) => {
                return blipService.find(result[0].id);
            }).then((result: Blip) => {
                expect(result).to.be.not.null;
            });
        });
    });

});