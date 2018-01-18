'use strict';

const Prehandler = require('./preHandler');


function router (args) {

    const { type, value, e, cell, state } = args;

    switch (type) {
        case 'cellInput':
            Prehandler.cellInput({state, e});
            break;
        case 'cellMousedown':
            Prehandler.cellMousedown(state, cell);
            break;
        case 'colHeaderMousedown':
            Prehandler.headerMousedown('col', e);
            break;
        case 'cellMouseover':
            Prehandler.cellMouseover(state, cell);
            break;
        case 'resizeRowColumn':
            Prehandler.resizeRowColumn(state, e, value);
            break;
        case 'rowHeaderMousedown':
            Prehandler.headerMousedown('row', e);
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
        case 'enableShiftActive':
            Prehandler.enableShiftActive();
            break;
        case 'commandActiveKeydown':
            Prehandler.commandActiveKeydown(state, e);
            break;
        case 'shiftActiveKeydown':
            Prehandler.shiftActiveKeydown(state, e);
            break;
        case 'windowKeyup':
            Prehandler.keyup(e);
            break;
        case 'buttonClick':
            Prehandler.toolbarButtonClick(state, e);
            break;
        default:
            console.warn('Router error: Unknown event', args); // eslint-disable-line
    }
    return;
}

module.exports = {
    router
};
