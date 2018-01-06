'use strict';

const CellListeners = require('../cell/eventListeners');
const WindowCommon = require('./common');
const WindowHandlers = require('./eventHandlers');
const $state = require('../state').$state;
const $setState = require('../state').$setState;

window.addEventListener('mouseup', (e) => windowMouseup());
window.addEventListener('keydown', (e) => windowKeydown(e));
window.addEventListener('keyup', (e) => windowKeyup(e));
window.addEventListener('mousemove', (e) => windowMousemove(e));
window.addEventListener('input', (e) => windowInput(e));
window.addEventListener('mousedown', (e) => windowMousedown(e));
window.addEventListener('mouseover', (e) => windowMouseover(e));

const windowInput = (e) => {

    const cell = WindowCommon.getCell(e);
    return cell ? CellListeners.cellInputListener(cell) : '';
}

const windowMousedown = (e) => {

    const cell = WindowCommon.getCell(e);
    return cell ? CellListeners.cellMousedownListener(cell) : '';
}

const windowMouseover = (e) => {

    const cell = WindowCommon.getCell(e);
    return cell && $state('mousedown') ? CellListeners.cellMouseoverListener(cell) : '';   
}

const windowMousemove = (e) => {

    if ($state('colDrag')) {
        WindowHandlers.handleResizeRowColumn(e, 'column');
    }
    else if ($state('rowDrag')) {
        WindowHandlers.handleResizeRowColumn(e, 'row');
    }
};

const windowMouseup = () => {

    $setState({
        mousedown: false,
        colDrag: false,
        rowDrag: false
    });
}

const windowKeydown = (e) => {

    if (e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown') {
        return WindowHandlers.handleNavigateCells(e);
    }

    if (e.key === 'Meta') {
        $setState({
            commandActive: true
        });
        return;
    }

    if ($state('commandActive')) {
        return WindowHandlers.handleCommandActiveKeydown(e);
    }
}

const windowKeyup = (e) => {

    if (e.key === 'Meta') {
        $setState({
            commandActive: false
        });
    } 
}
