'use strict';

function cellInput (cell) {

    if (_state.funcCellOutput[cell.id]) {
        handleFuncCellOutput(cell);
    }
    if (_state.funcCellInput[cell.id]) {
        handleFuncCellInput(cell);
    }
    return;
}

function cellMousedown (cell) {

    newSelectedCell(cell);
    _state.mousedown = true;
    return;
}

function cellMouseover (cell) {

    if (_state.mousedown) {
        handleDrag(cell);
    }
    return;
}
