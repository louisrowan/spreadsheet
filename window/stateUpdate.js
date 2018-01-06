'use strict';

const _state = require('../state')._state;

const setDraggableDivToCell = (cellBounding) => {

    _state.draggableDiv.style.visibility = 'visible';
    _state.draggableDiv.style.left = cellBounding.x + 'px';
    _state.draggableDiv.style.top = cellBounding.y + 'px';
    _state.draggableDiv.style.width = '0px';
    _state.draggableDiv.style.height = '0px';
}

const setDraggableDivToDimensions = (left, top, width, height) => {

    _state.draggableDiv.style.left = left + 'px';
    _state.draggableDiv.style.top = top + 'px';
    _state.draggableDiv.style.width = width + 'px';
    _state.draggableDiv.style.height = height + 'px';
    return
}

const toggleMousedown = (value) => {

    _state.mousedown = value;
    return;
}

module.exports = {
    setDraggableDivToCell,
    setDraggableDivToDimensions,
    toggleMousedown
}
