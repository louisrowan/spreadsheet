'use strict';

const Code = require('code');
const Lab = require('lab');
const Router = require('../../../lib/router').router;
const { Setup } = require('../../setupEnvironment');
require('../../mockDom');


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;
const beforeEach = lab.beforeEach;


// Declare internals;

const internals = {};

describe('header mousedown', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles col header mousedown', (done) => {

        const state = this.state;

        // simulate mousedown
        const index = 2;
        Router({ state, type: 'colHeaderMousedown', e: {
            target: { id: `colHeader.${index}` }
        }});

        expect(state.colDrag).to.equal(index);
        expect(state.rowDrag).to.equal(false);
        expect(state.mousedown).to.equal(true);

        done();
    });

    it('handles row header mousedown', (done) => {

        const state = this.state;

        // simulate mousedown
        const index = 2;
        Router({ state, type: 'rowHeaderMousedown', e: {
            target: { id: `rowHeader.${index}` }
        }});

        expect(state.rowDrag).to.equal(index);
        expect(state.colDrag).to.equal(false);
        expect(state.mousedown).to.equal(true);

        done();
    });
});
