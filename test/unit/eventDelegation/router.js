// 'use strict';

// const Code = require('code');
// const Lab = require('lab');
// const Sinon = require('sinon');
// const Router = require('../../../lib/router').router;

// // Test shortcuts

// const lab = exports.lab = Lab.script();
// const expect = Code.expect;
// const describe = lab.describe;
// const it = lab.it;
// const before = lab.before;
// const after = lab.after;

// describe('Router', () => {

//     let sandbox;
//     let catchStdout;

//     before((done) => {

//         sandbox = Sinon.sandbox.create();
//         catchStdout = [];
//         const Prehandler = require('../../../lib/prehandler');
//         Prehandler.cellInput = Sinon.stub().returns(catchStdout += 'called cell input');
//         Prehandler.cellMousedown = Sinon.stub().returns(catchStdout += 'called cell Mousedown');
//         Prehandler.cellMouseover = Sinon.stub().returns(catchStdout += 'called cell Mouseover');
//         Prehandler.resizeRowColumn = Sinon.stub().returns(catchStdout += 'called resizeRowColumn');
//         Prehandler.mouseup = Sinon.stub().returns(catchStdout += 'called windowMouseup');
//         Prehandler.navigateCells = Sinon.stub().returns(catchStdout += 'called navigateCells');
//         Prehandler.enableCommandActive = Sinon.stub().returns(catchStdout += 'called enableCommandActive');
//         Prehandler.commandActiveKeydown = Sinon.stub().returns(catchStdout += 'called commandActiveKeydown');
//         Prehandler.keyup = Sinon.stub().returns(catchStdout += 'called windowKeyup');
//         Prehandler.toolbarButtonClick = Sinon.stub().returns(catchStdout += 'called buttonClick');

//         return done();
//     });

//     after((done) => {

//         console.log('sand?', sandbox);
//         sandbox.restore();
//         return done();
//     });

//     it('Prints warning to console for unknown event', (done) => {

//         let tmp = console.warn;
//         console.warn = (input) => { catchStdout += input };
//         const result = Router({ type: 'error' });
//         console.warn = tmp;

//         expect(catchStdout).to.exist();
//         expect(catchStdout.includes('Router error: Unknown event')).to.equal(true);

//         done();
//     });

//     it('Properly routes cell input event', (done) => {

//         Router({ type: 'cellInput' });
//         expect(catchStdout).to.equal('called cell input');

//         done();
//     });

//     it('Properly routes cell Mousedown event', (done) => {

//         Router({ type: 'cellMousedown' });
//         expect(catchStdout).to.equal('called cell Mousedown');

//         done();
//     });

//     it('Properly routes cell Mouseover event', (done) => {

//         Router({ type: 'cellMouseover' });
//         expect(catchStdout).to.equal('called cell Mouseover');

//         done();
//     });

//     it('Properly routes resizeRowColumn event', (done) => {

//         Router({ type: 'resizeRowColumn' });
//         expect(catchStdout).to.equal('called resizeRowColumn');

//         done();
//     });

//     it('Properly routes windowMouseup event', (done) => {

//         Router({ type: 'windowMouseup' });
//         expect(catchStdout).to.equal('called windowMouseup');

//         done();
//     });

//     it('Properly routes navigateCells event', (done) => {

//         Router({ type: 'navigateCells' });
//         expect(catchStdout).to.equal('called navigateCells');

//         done();
//     });

//     it('Properly routes enableCommandActive event', (done) => {

//         Router({ type: 'enableCommandActive' });
//         expect(catchStdout).to.equal('called enableCommandActive');

//         done();
//     });

//     it('Properly routes commandActiveKeydown event', (done) => {

//         Router({ type: 'commandActiveKeydown' });
//         expect(catchStdout).to.equal('called commandActiveKeydown');

//         done();
//     });

//     it('Properly routes windowKeyup event', (done) => {

//         Router({ type: 'windowKeyup' });
//         expect(catchStdout).to.equal('called windowKeyup');

//         done();
//     });

//     it('Properly routes buttonClick event', (done) => {

//         Router({ type: 'buttonClick' });
//         expect(catchStdout).to.equal('called buttonClick');

//         done();
//     });
// });