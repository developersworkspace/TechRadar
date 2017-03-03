// Imports
import proxyquire = require('proxyquire');
import 'mocha';
import { expect } from 'chai';

// Imports services
import { BlipService } from './../../../api/src/services/blip';

// Imports models
import { Blip } from './../../../api/src/models/blip';

describe('BlipService', () => {

    let blipService: BlipService = null;

    beforeEach(() => {
        blipService = new BlipService();

        return Promise.all([
            blipService.create('Consul', 'New Tech', 'Tools', 'hello@example.com', 1)
        ]);
    });

    describe('list', () => {
        it('should return array of Blip', () => {
            return blipService.list().then((result: Blip[]) => {
                expect(result).to.be.not.null;
                expect(result.length).to.be.greaterThan(0);
            });
        });
    });
});