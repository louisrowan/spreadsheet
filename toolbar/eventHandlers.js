'use strict';

function handlePaste () {

    // sort copied cells, find top-right from active cells
    _state.cutCopy.cells = sortCellsByPosition(_state.cutCopy.cells);
    const startCell = sortCellsByPosition(_state.activeCells)[0];
    const cols = getColumnCount(_state.cutCopy.cells)

    // reset active cells to empty, find first cell to being copying to from allCells array and its index in the array
    _state.activeCells = [];
    const ac = _state.allCells.find((ac) => ac.id === startCell.id)
    const index = _state.allCells.indexOf(ac);

    // push cell from allCells to activeCells array, accounting for new rows
    let columnsAdded = 0;
    for (let i = index; _state.activeCells.length < _state.cutCopy.cells.length; ++i) {

        if (columnsAdded === cols) {
            i = i - cols + COL_COUNT - 1;
            columnsAdded = 0;
            if (i > _state.allCells.length) {
                break;
            }
            continue;
        }

        const newCell = _state.allCells[i];
        _state.activeCells.push(newCell);
        ++columnsAdded
    }

    // Loop through these active cells and copy value from copied array
    _state.activeCells.forEach((cell, index) => {

        cell.input.value = _state.cutCopy.cells[index].input.value;
        cellInput(cell);
        if (_state.cutCopy.type === 'cut') {
            handleCut(_state.activeCells, _state.cutCopy.cells[index]);
        }
    });
}

function handleCut (pastedCells, cutCell) {

    const found = pastedCells.find((p) => isSameCell(p, cutCell));
    if (!found) {
        const originalCutCell = _state.allCells.find((c) => isSameCell(c, cutCell));
        clearCell(originalCutCell);
    } 
}
