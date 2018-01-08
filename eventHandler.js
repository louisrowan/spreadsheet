'use strict';

const CellListeners = require('./cell/eventListeners');
const ToolbarListeners = require('./toolbar/eventListeners');
const WindowHandlers = require('./window/eventHandlers');

module.exports = (args) => {

    const { type, value, e, cell } = args;
    const newState = {};
    const newCells = {};

    console.log('in here', event);

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
            WindowHandlers.handleMouseup();
            break;
        case 'navigateCells':
            WindowHandlers.handleNavigateCells(e);
            break;
        case 'enableCommandActive':
            WindowHandlers.enableCommandActive();
            break;
        case 'commandActiveKeydown':
            WindowHandlers.handleCommandActiveKeydown(e);
            break;
        case 'windowKeyup':
            WindowHandlers.handleWindowKeyup();
            break;
        default:
            console.log('err', args);
    }

    return;
}
