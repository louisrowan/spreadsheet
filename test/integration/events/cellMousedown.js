'use strict';

const Code = require('code');
const Lab = require('lab');
const Sinon = require('sinon');
const Router = require('../../../lib/router').router;
require('../../mockDom');


// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;


// Declare internals;

const internals = {};

internals.setupEnv = () => {

    require('../../../lib/index');
    return require('../../../lib/state')._state;
};

describe('cellMousedown', () => {

    it('handles cell mousedown', (done) => {

        const state = internals.setupEnv();
        const cell = state.allCells['r1.c1'];

        expect(state.mousedown).to.equal(false);
        expect(state.startCellRect).to.equal({});
        expect(state.activeCells.length).to.equal(0);

        Router({
            type: 'cellMousedown',
            cell
        });

        expect(state.mousedown).to.equal(true);
        expect(state.activeCells.length).to.equal(1);
        expect(state.startCellRect.id).to.equal(cell.id);

        done();
    });
});