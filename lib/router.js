'use strict';

// const CellListeners = require('./cell/eventListeners');
// const ToolbarListeners = require('./toolbar/eventListeners');
// const WindowHandlers = require('./window/eventHandlers');
const { _state } = require('./state');
const Prehandler = require('./prehandler');


const router = (args) => {

    const { type, value, e, cell } = args;
    const state = _state;

    switch (type) {
        case 'cellInput':
            // CellListeners.cellInputListener(state, cell);
            Prehandler.cellInput(state, cell);
            break;
        case 'cellMousedown':
            // CellListeners.cellMousedownListener(state, cell);
            Prehandler.cellMousedown(state, cell);
            break;
        case 'cellMouseover':
            // CellListeners.cellMouseoverListener(state, cell);
            Prehandler.cellMouseover(state, cell);
            break;
        case 'resizeRowColumn':
            // WindowHandlers.handleResizeRowColumn(state, e, value);
            Prehandler.resizeRowColumn(state, e, value);
            break;
        case 'windowMouseup':
            // WindowHandlers.handleMouseup(state);
            Prehandler.mouseup();
            break;
        case 'navigateCells':
            // WindowHandlers.handleNavigateCells({ e, state});
            Prehandler.navigateCells(state, e)
            break;
        case 'enableCommandActive':
            // WindowHandlers.enableCommandActive(state);
            Prehandler.enableCommandActive();
            break;
        case 'commandActiveKeydown':
            // WindowHandlers.handleCommandActiveKeydown(state, e);
            Prehandler.commandActiveKeydown(state, e);
            break;
        case 'windowKeyup':
            // WindowHandlers.handleWindowKeyup(state);
            Prehandler.keyup();
            break;
        case 'buttonClick':
            ToolbarListeners.handleButtonClick(state, e);
            break;
        default:
            console.log('err', args);
    }
    return;
}

module.exports = {
    router
};
