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

describe('click sum', () => {

    beforeEach((next) => {

        this.state = Setup();
        return next();
    });

    it('handle summing cells - 1 col', (done) => {

        const state = this.state;

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

        const cell3 = state.allCells['r3.c1'];
        const cell3Val = '8';
        Router({ state, type: 'cellMousedown', cell: cell3 });
        Router({ state, type: 'windowMouseup' });
        Router({ state, type: 'cellInput', e:
            { key: cell3Val }
        });

        // select cells
        Router({ state, type: 'cellMousedown', cell: cell1 });
        Router({ state, type: 'cellMouseover', cell: cell3 });
        Router({ state, type: 'windowMouseup' });
        expect(state.activeCells.length).to.equal(3);

        const summedCell = state.allCells['r4.c1'];
        expect(summedCell.input.value).to.equal('');
        expect(state.funcCellOutput[summedCell.id]).to.not.exist();

        // click sum
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'sumButton'}
        }});

        expect(summedCell.input.value).to.equal(+cell1Val + +cell2Val + +cell3Val);
        expect(state.funcCellOutput[summedCell.id]).to.exist();
        expect(state.funcCellOutput[summedCell.id].length).to.equal(3);
        expect(state.funcCellOutput[summedCell.id].includes(cell1.id)).to.equal(true);
        expect(state.funcCellOutput[summedCell.id].includes(cell2.id)).to.equal(true);
        expect(state.funcCellOutput[summedCell.id].includes(cell3.id)).to.equal(true);

        done();
    });

    it('handle summing cells - 2 cols', (done) => {

        const state = this.state;

        // first column
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

        // second column
        const cell3 = state.allCells['r1.c2'];
        const cell3Val = '9';
        Router({ state, type: 'cellMousedown', cell: cell3 });
        Router({ state, type: 'windowMouseup' });
        Router({ state, type: 'cellInput', e:
            { key: cell3Val }
        });

        const cell4 = state.allCells['r2.c2'];
        const cell4Val = '3';
        Router({ state, type: 'cellMousedown', cell: cell4 });
        Router({ state, type: 'windowMouseup' });
        Router({ state, type: 'cellInput', e:
            { key: cell4Val }
        });

        // select cells
        Router({ state, type: 'cellMousedown', cell: cell1 });
        Router({ state, type: 'cellMouseover', cell: cell4 });
        Router({ state, type: 'windowMouseup' });
        expect(state.activeCells.length).to.equal(4);

        const summedCell1 = state.allCells['r3.c1'];
        expect(summedCell1.input.value).to.equal('');
        expect(state.funcCellOutput[summedCell1.id]).to.not.exist();

        const summedCell2 = state.allCells['r3.c2'];
        expect(summedCell2.input.value).to.equal('');
        expect(state.funcCellOutput[summedCell2.id]).to.not.exist();

        // click sum
        Router({ state, type: 'buttonClick', e: {
            target: { id: 'sumButton'}
        }});

        expect(summedCell1.input.value).to.equal(+cell1Val + +cell2Val);
        expect(summedCell2.input.value).to.equal(+cell3Val + +cell4Val);

        expect(state.funcCellOutput[summedCell1.id].includes(cell1.id)).to.equal(true);
        expect(state.funcCellOutput[summedCell1.id].includes(cell2.id)).to.equal(true);
        expect(state.funcCellOutput[summedCell2.id].includes(cell3.id)).to.equal(true);
        expect(state.funcCellOutput[summedCell2.id].includes(cell4.id)).to.equal(true);

        done();
    });
});