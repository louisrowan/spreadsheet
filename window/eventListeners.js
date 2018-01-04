'use strict';

const CellListeners = require('../cell/eventListeners');
const WindowCommon = require('./common');
const WindowHandlers = require('./eventHandlers');
const _state = require('../state')._state;

window.addEventListener('mouseup', (e) => windowMouseup());
window.addEventListener('keydown', (e) => windowKeydown(e));
window.addEventListener('keyup', (e) => windowKeyup(e));
window.addEventListener('mousemove', (e) => windowMousemove(e));
window.addEventListener('input', (e) => windowInput(e));
window.addEventListener('mousedown', (e) => windowMousedown(e));
window.addEventListener('mouseover', (e) => windowMouseover(e));

const windowInput = (e) => {

    const cell = WindowCommon.getCell(e);
    return cell ? CellListeners.cellInput(cell) : '';
}

const windowMousedown = (e) => {

    const cell = WindowCommon.getCell(e);
    return cell ? CellListeners.cellMousedown(cell) : '';
}

const windowMouseover = (e) => {

    const cell = WindowCommon.getCell(e);
    return cell ? CellListeners.cellMouseover(cell) : '';   
}

const windowMousemove = (e) => {

    if (_state.colDrag) {
        WindowHandlers.handleResizeRowColumn(e, 'column');
    }
    else if (_state.rowDrag) {
        WindowHandlers.handleResizeRowColumn(e, 'row');
    }
};

const windowMouseup = () => {

    _state.mousedown = false;
    _state.colDrag = false;
    _state.rowDrag = false;
}

const windowKeydown = (e) => {

    if (e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown') {
        return WindowHandlers.handleNavigateCells(e);
    }

    if (e.key === 'Meta') {
        return _state.commandActive = true;
    }

    if (_state.commandActive) {
        return WindowHandlers.handleCommandActiveKeydown(e);
    }
}

const windowKeyup = (e) => {

    if (e.key === 'Meta') {
        _state.commandActive = false;
    } 
}
