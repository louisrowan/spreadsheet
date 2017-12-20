'use strict';

function cellInput (cell, e) {

    cell.input.value = e.target.value;
    return;
}

function cellMousedown (cell, e) {

    newSelectedCell(cell);
    _state.mousedown = true;
    return;
}

function cellMouseover (cell, e) {

    if (_state.mousedown) {
        handleDrag(cell);
    }
    return;
}
