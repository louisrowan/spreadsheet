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

describe('clickDelete', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handles clicking delete', (done) => {

        const state = this.state;

        // simulate active cells with text
        state.activeCells = ['r1.c1', 'r1.c2', 'r2.c1', 'r2.c2'];
        let num = 1;
        state.activeCells.forEach((id) => {

            const cell = state.allCells[id];
            cell.input.value = num;
            ++num;
        });
        state.activeCells.forEach((id) => {

            const cell = state.allCells[id];
            expect(cell.input.value).to.be.a.number();
        });

        // click delete
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'deleteButton' }
        }});
        state.activeCells.forEach((id) => {

            const cell = state.allCells[id];
            expect(cell.input.value).to.equal('');
        });

        done();
    });
});
