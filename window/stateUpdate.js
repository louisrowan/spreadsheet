'use strict';

const { _state, $setState, $updateDraggable } = require('../state');

const setDraggableDivToCell = (cellBounding) => {

    $updateDraggable({
        visibility: 'visible',
        left: cellBounding.x + 'px',
        top: cellBounding.y + 'px',
        width: '0px',
        height: '0px'
    });

    // _state.draggableDiv.style.visibility = 'visible';
    // _state.draggableDiv.style.left = cellBounding.x + 'px';
    // _state.draggableDiv.style.top = cellBounding.y + 'px';
    // _state.draggableDiv.style.width = '0px';
    // _state.draggableDiv.style.height = '0px';
}

const setDraggableDivToDimensions = (left, top, width, height) => {

    $updateDraggable({
        left: left + 'px',
        top: top + 'px',
        width: width + 'px',
        height: height + 'px',
    });

    // _state.draggableDiv.style.left = left + 'px';
    // _state.draggableDiv.style.top = top + 'px';
    // _state.draggableDiv.style.width = width + 'px';
    // _state.draggableDiv.style.height = height + 'px';
    return
}

const toggleMousedown = (value) => {

    $setState({ mousedown: value })

    return;
}

module.exports = {
    setDraggableDivToCell,
    setDraggableDivToDimensions,
    toggleMousedown
}
