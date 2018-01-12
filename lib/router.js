'use strict';

const { _state } = require('./state');
const Prehandler = require('./prehandler');


function router (args) {

    const st = Date.now()

    const { type, value, e, cell } = args;
    const state = _state;

    switch (type) {
        case 'cellInput':
            Prehandler.cellInput(state, cell, e);
            break;
        case 'cellMousedown':
            Prehandler.cellMousedown(state, cell);
            break;
        case 'cellMouseover':
            Prehandler.cellMouseover(state, cell);
            break;
        case 'resizeRowColumn':
            Prehandler.resizeRowColumn(state, e, value);
            break;
        case 'windowMouseup':
            Prehandler.mouseup(state);
            break;
        case 'navigateCells':
            Prehandler.navigateCells(state, e);
            break;
        case 'enableCommandActive':
            Prehandler.enableCommandActive();
            break;
        case 'commandActiveKeydown':
            Prehandler.commandActiveKeydown(state, e);
            break;
        case 'windowKeyup':
            Prehandler.keyup();
            break;
        case 'buttonClick':
            Prehandler.toolbarButtonClick(state, e);
            break;
        default:
            console.warn('Router error: Unknown event', args); // eslint-disable-line
    }
    console.log(type, '......', Date.now() - st);
    return;
}

module.exports = {
    router
};
