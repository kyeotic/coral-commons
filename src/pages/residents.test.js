import chai, { expect } from 'chai';
import System from 'systemjs';
import '../../jspm.config.js';

describe('myModule', () => {
    let residents;

    before(function () {
        System.delete(System.normalizeSync('util/http'));
        System.set(System.normalizeSync('util/http'), System.newModule({ default: { } }));

        System.delete(System.normalizeSync('util/toast'));
        System.set(System.normalizeSync('util/toast'), System.newModule({ default: { } }));

        System.delete(System.normalizeSync('util/confirm'));
        System.set(System.normalizeSync('util/confirm'), System.newModule({ default: { } }));

        System.delete(System.normalizeSync('util/firebase'));
        System.set(System.normalizeSync('util/firebase'), System.newModule({
            default: {
                child: function() {}
            },
            subscribeToFirebase: function() {} }));

        return System.import('pages/residents')
            .then((mod) => residents = mod);
    });

    describe('Module Loading', () => {
        it('should load', () => {
            expect(residents['default']).to.equal(residents.default);
        });
    });
});