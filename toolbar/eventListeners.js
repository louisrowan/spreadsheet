'use strict';

function eraseButton_Click () {

    _state.activeCells.forEach((cell) => cell.input.value = '');
}

function cssButton_Click (atts) {

    _state.activeCells.forEach((cell) => {

        // toggle property
        let style = cell.input.style;
        style[atts.key] = style[atts.key] === atts.value ? '' : atts.value;
    });
}

function cutCopyButton_Click (type) {

    sortCellsByPosition(_state.activeCells);
    _state.cutCopy.type = type;
    _state.cutCopy.cells = _state.activeCells.map((c) => {

        const copied = copyCell(c);
        copied.row = c.row;
        copied.column = c.column
        return copied;
    });
}

function pasteButton_Click () {

    handlePaste();
}

function sumButton_Click () {

    if (!_state.activeCells || _state.activeCells.length < 2) {
        return;
    }

    const cellsByCol = {};
    let finalRow = _state.activeCells[0].row;
    _state.activeCells.forEach((cell) => {

        finalRow = cell.row > finalRow ? cell.row : finalRow;

        if (!cellsByCol[cell.column]) {
            cellsByCol[cell.column] = [];
        }
        cellsByCol[cell.column].push({
            val: cell.input.value || 0,
            column: cell.column,
            row: cell.row
        })
    })

    Object.keys(cellsByCol).forEach((i) => {

        const sum = cellsByCol[i].reduce((a, b) => a += +b.val, 0);
        const column = cellsByCol[i][0].column;
        const cellToSum = _state.allCells.find((c) => c.row === finalRow + 1 && c.column === column);
        cellToSum.input.value = sum;
    })
}