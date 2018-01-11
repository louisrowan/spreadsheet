'use strict';

const { $setState, $updateDraggable } = require('../state');


const setDraggableDivToCell = (cellBounding) => {

    $updateDraggable({
        visibility: 'visible',
        left: cellBounding.x + 'px',
        top: cellBounding.y + 'px',
        width: '0px',
        height: '0px'
    });
};


const setDraggableDivToDimensions = (left, top, width, height) => {

    $updateDraggable({
        left: left + 'px',
        top: top + 'px',
        width: width + 'px',
        height: height + 'px',
    });
};


const toggleMousedown = (value) => {

    $setState({ mousedown: value });
};


module.exports = {
    setDraggableDivToCell,
    setDraggableDivToDimensions,
    toggleMousedown
};
