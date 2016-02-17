import chai, { expect } from 'chai';
import System from 'systemjs';
import '../../jspm.config.js';

describe('myModule', () => {
    let residents;

    before(() => {
        return System.import('pages/residents')
            .then((mod) => residents = mod);
    });

    describe('Module Loading', () => {
        it('should load', () => {
            expect(residents['default']).to.not.be.undefined;
        });
    });
});