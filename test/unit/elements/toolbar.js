'use strict';

const Code = require('code');
const Lab = require('lab');
const Elements = require('../../../lib/toolbar/elements');

// Test shortcuts

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;

describe('Toolbars', () => {

    describe('Toolbar', () => {

        it('Creates with no error', (done) => {

            const toolbar = new Elements.Toolbar();

            expect(toolbar).to.exist();

            done();
        });

        it('Properly styles toolbar', (done) => {

            const toolbar = new Elements.Toolbar();
            const style = toolbar.style;

            expect(style.background).to.equal('white');
            expect(style.height).to.equal('100px');
            expect(style.border).to.equal('1px solid black');
            expect(style.position).to.equal('fixed');
            expect(style.width).to.equal('100%');
            expect(style.minWidth).to.equal('500px');

            done();
        });
    });

    describe('Buttons', () => {

        it('Creates ToolbarBuffer and matches toolbar height', (done) => {

            const toolbar = new Elements.Toolbar();
            const toolbarBuffer = new Elements.ToolbarBuffer();

            expect(toolbarBuffer.style.height).to.equal(toolbar.style.height);

            done();
        });

        it('Creates Erase Button', (done) => {

            const eraseButton = new Elements.EraseButton();

            expect(eraseButton).to.exist();
            expect(eraseButton.innerText).to.equal('Delete');
            expect(eraseButton.id).to.equal('deleteButton');

            done();
        });

        it('Creates CssButton', (done) => {

            const options = {
                text: 'B',
                key: 'fontWeight',
                value: 'bold'
            };

            const boldButton = new Elements.CssButton(options);

            expect(boldButton.innerText).to.equal('B');
            expect(boldButton.style[options.key]).to.exist();
            expect(boldButton.style[options.key]).to.equal(options.value);

            done();
        });
    });
});