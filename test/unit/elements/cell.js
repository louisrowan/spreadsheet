'use strict';

const Code = require('code');
const Lab = require('lab');
const { Cell } = require('../../../lib/cell/elements');

// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;

describe('Cell', () => {

    it('Creates with no error', (done) => {

        const cell = new Cell();
        expect(cell).to.exist();

        done();
    });

    it('Creates with proper row, column and id', (done) => {

        const row = 5;
        const column = 20;

        const cell = new Cell(row, column);
        expect(cell.row).to.equal(row);
        expect(cell.column).to.equal(column);
        expect(cell.id).to.equal(`r${row}.c${column}`);

        done();
    });
});