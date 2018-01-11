'use strict';

const { _state } = require('./state');
const Prehandler = require('./prehandler');


function router (args) {

    const { type, value, e, cell } = args;
    const state = _state;

    switch (type) {
        case 'cellInput':
            Prehandler.cellInput(state, cell);
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
            Prehandler.mouseup();
            break;
        case 'navigateCells':
            Prehandler.navigateCells(state, e)
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
            Prehandler.toolbarButtonClick(state, e)
            break;
        default:
            console.log('err', args);
    }
    return;
}

module.exports = {
    router
};
