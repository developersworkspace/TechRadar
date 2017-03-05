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
        let mongoClient = mongodb.MongoClient;

        blipService = new BlipService(mongoClient);

        return Promise.all([
            blipService.create('Consul', 'New Tech', 'Tools', 'hello@example.com', 1)
        ]);
    });

    describe('list', () => {
        it('should return array of Blip', () => {
            return blipService.list().then((result: Blip[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.equal(1);
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
    });
});