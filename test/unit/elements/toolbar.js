'use strict';

const Code = require('code');
const Lab = require('lab');
const { Toolbar } = require('../../../lib/toolbar/elements');

// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;

describe('Toolbar', () => {

    it('Creates with no error', (done) => {

        const toolbar = new Toolbar();
        expect(toolbar).to.exist();

        done();
    });
});