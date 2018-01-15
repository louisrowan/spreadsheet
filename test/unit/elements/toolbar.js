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

        it('Adds correct buttons to toolbar', (done) => {

            const toolbar = new Elements.Toolbar();

            const children = toolbar.children;
            expect(children).to.exist();
            expect(children.find((c) => c. id = 'deleteButton')).to.exist();
            expect(children.find((c) => c. id = 'cutButton')).to.exist();
            expect(children.find((c) => c. id = 'copyButton')).to.exist();
            expect(children.find((c) => c. id = 'pasteButton')).to.exist();
            expect(children.find((c) => c. id = 'sumButton')).to.exist();
            expect(children.find((c) => c. id = 'boldButton')).to.exist();
            expect(children.find((c) => c. id = 'italicButton')).to.exist();
            expect(children.find((c) => c. id = 'underlineButton')).to.exist();
            expect(children.find((c) => c. id = 'leftalignButton')).to.exist();
            expect(children.find((c) => c. id = 'centeralignButton')).to.exist();
            expect(children.find((c) => c. id = 'rightalignButton')).to.exist();

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

            const buttons = [
                {
                    key: 'fontWeight',
                    value: 'bold',
                    text: 'B',
                    id: 'boldButton'
                },
                {
                    key: 'fontStyle',
                    value: 'italic',
                    text: 'I',
                    id: 'italicButton'
                },
                {
                    key: 'textDecoration',
                    value: 'underline',
                    text: 'U',
                    id: 'underlineButton'
                },
                {
                    key: 'textAlign',
                    value: 'left',
                    text: '=',
                    id: 'leftalignButton'
                },
                {
                    key: 'textAlign',
                    value: 'center',
                    text: '=',
                    id: 'centeralignButton'
                },
                {
                    key: 'textAlign',
                    value: 'right',
                    text: '=',
                    id: 'rightalignButton'
                }
            ];

            buttons.forEach((props) => {

                const button = new Elements.CssButton(props);

                expect(button.innerText).to.equal(props.text);
                expect(button.style[props.key]).to.exist();
                expect(button.style[props.key]).to.equal(props.value);
                expect(button.id).to.equal(props.id);
            });

            done();
        });

        it('Creates cut and copy buttons', (done) => {

            const cutButton = new Elements.CutCopyButton('cut');

            expect(cutButton.innerText).to.equal('cut');
            expect(cutButton.id).to.equal('cutButton');

            const copyButton = new Elements.CutCopyButton('copy');

            expect(copyButton.innerText).to.equal('copy');
            expect(copyButton.id).to.equal('copyButton');

            done();
        });

        it('Creates paste button', (done) => {

            const pasteButton = new Elements.PasteButton();

            expect(pasteButton.innerText).to.equal('paste');
            expect(pasteButton.id).to.equal('pasteButton');

            done();
        });

        it('Creates sum button', (done) => {

            const sumButton = new Elements.SumButton();

            expect(sumButton.innerText).to.equal('sum');
            expect(sumButton.id).to.equal('sumButton');

            done();
        });
    });
});