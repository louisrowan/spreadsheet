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

describe('func cell input', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handle func cell input', (done) => {

        const state = this.state;

        // input values
        const cell1 = state.allCells['r1.c1'];
        const cell1Val = '1';
        Router({ state, type: 'cellMousedown', cell: cell1 });
        Router({ state, type: 'windowMouseup' });
        Router({ state, type: 'cellInput', e:
            { key: cell1Val }
        });
        
        const cell2 = state.allCells['r2.c1'];
        const cell2Val = '5';
        Router({ state, type: 'cellMousedown', cell: cell2 });
        Router({ state, type: 'windowMouseup' });
        Router({ state, type: 'cellInput', e:
            { key: cell2Val }
        });

        // select cells
        Router({ state, type: 'cellMousedown', cell: cell1 });
        Router({ state, type: 'cellMouseover', cell: cell2 });
        Router({ state, type: 'windowMouseup' });

        const summedCell = state.allCells['r3.c1'];
        // click sum
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'sumButton'}
        }});

        expect(summedCell.input.value).to.equal(+cell1Val + +cell2Val);
        expect(state.funcCellOutput[summedCell.id]).to.exist();
        expect(state.funcCellOutput[summedCell.id].length).to.equal(2);
        expect(state.funcCellOutput[summedCell.id].includes(cell1.id)).to.equal(true);
        expect(state.funcCellOutput[summedCell.id].includes(cell2.id)).to.equal(true);

        expect(state.funcCellInput[cell1.id].includes(summedCell.id)).to.equal(true);
        expect(state.funcCellInput[cell2.id].includes(summedCell.id)).to.equal(true);

        const newCell1Val = '9';
        Router({ state, type: 'cellMousedown', cell: cell1 });
        Router({ state, type: 'windowMouseup' });
        Router({ state, type: 'cellInput', e:
            { key: 'Backspace' }
        });
        Router({ state, type: 'cellInput', e:
            { key: newCell1Val }
        });

        expect(summedCell.input.value).to.not.equal(+cell1Val + +cell2Val);
        expect(summedCell.input.value).to.equal(+newCell1Val + +cell2Val);
        expect(state.funcCellOutput[summedCell.id].length).to.equal(2);

        expect(state.funcCellInput[cell1.id].includes(summedCell.id)).to.equal(true);
        expect(state.funcCellInput[cell2.id].includes(summedCell.id)).to.equal(true);

        done();
    });
});