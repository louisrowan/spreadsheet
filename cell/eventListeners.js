'use strict';

function cellInput (cell, e) {

    cell.input.value = e.target.value;
    if (_state.funcCellOutput[cell.id]) {
        delete _state.funcCellOutput[cell.id];
    }
    if (_state.funcCellInput[cell.id]) {
        _state.funcCellInput[cell.id].forEach((inputCell) => {

            const cellToUpdate = _state.allCells.find((c) => c.id === inputCell);
            cellToUpdate.input.value = _state.funcCellOutput[inputCell].reduce((a, b) => {

                const cellToSum = _state.allCells.find((_c) => _c.id === b);
                return a += +cellToSum.input.value;
            }, 0)
        })
    }
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
