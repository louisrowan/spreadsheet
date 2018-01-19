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

const internals = {}; // eslint-disable-line

describe('cellMousedown', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles cell mousedown', (done) => {

        const state = this.state;
        const cell = state.allCells['r1.c1'];

        expect(state.mousedown).to.equal(false);
        expect(state.startCellRect).to.equal({});
        expect(state.activeCells.length).to.equal(0);

        Router({
            state,
            type: 'cellMousedown',
            cell
        });

        expect(state.mousedown).to.equal(true);
        expect(state.activeCells.length).to.equal(1);
        expect(state.startCellRect.id).to.equal(cell.id);

        done();
    });
});