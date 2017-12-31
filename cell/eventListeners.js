'use strict';

function cellInput (cell, e) {

    if (_state.funcCellOutput[cell.id]) {
        delete _state.funcCellOutput[cell.id];
        Object.keys(_state.funcCellInput).forEach((each) => {

            if (_state.funcCellInput[each].includes(cell.id)) {
                delete _state.funcCellInput[each];
            }
        })
    }
    if (_state.funcCellInput[cell.id]) {
        _state.funcCellInput[cell.id].forEach((inputCell) => {

            const cellToUpdate = _state.allCells.find((c) => c.id === inputCell);
            cellToUpdate.input.value = _state.funcCellOutput[inputCell].reduce((a, b) => {

                const cellToSum = _state.allCells.find((_c) => _c.id === b);
                if (isNaN(+cellToSum.input.value)) {
                    return a;
                }
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
