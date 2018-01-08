'use strict';

const CellListeners = require('./cell/eventListeners');
const ToolbarListeners = require('./toolbar/eventListeners');
const WindowHandlers = require('./window/eventHandlers');
const { _state } = require('./state');

module.exports = function (args) {

    const { type, value, e, cell } = args;
    const state = _state;

    switch (type) {
        case 'cellInput':
            CellListeners.cellInputListener(cell);
            break;
        case 'cellMousedown':
            CellListeners.cellMousedownListener(cell);
            break;
        case 'cellMouseover':
            CellListeners.cellMouseoverListener(cell);
            break;
        case 'resizeRowColumn':
            WindowHandlers.handleResizeRowColumn(e, value);
            break;
        case 'windowMouseup':
            WindowHandlers.handleMouseup(state);
            break;
        case 'navigateCells':
            WindowHandlers.handleNavigateCells({ e, state});
            break;
        case 'enableCommandActive':
            WindowHandlers.enableCommandActive(state);
            break;
        case 'commandActiveKeydown':
            WindowHandlers.handleCommandActiveKeydown(e);
            break;
        case 'windowKeyup':
            WindowHandlers.handleWindowKeyup(state);
            break;
        default:
            console.log('err', args);
    }
    return;
}
