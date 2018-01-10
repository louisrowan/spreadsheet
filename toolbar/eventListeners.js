'use strict';

const { $cell, $setCell, _state, $setState } = require('../state');
const CellCommon = require('../cell/common');


const handleButtonClick = (state, e) => {

    if (!e.target.id) return;

    switch (e.target.id) {
        case 'deleteButton':
            eraseButtonClick(state);
            break;
        case 'boldButton':
            cssButtonClick(state, {
                key: 'fontWeight', value: 'bold'
            });
            break;
        case 'italicButton':
            cssButtonClick(state, {
                key: 'fontStyle', value: 'italic'
            });
            break;
        case 'underlineButton':
            cssButtonClick(state, {
                key: 'textDecoration', value: 'underline'
            });
            break;
        case 'leftalignButton':
            cssButtonClick(state, {
                key: 'textAlign', value: 'left'
            });
            break;
        case 'centeralignButton':
            cssButtonClick(state, {
                key: 'textAlign', value: 'center'
            });
            break;
        case 'rightalignButton':
            cssButtonClick(state, {
                key: 'textAlign', value: 'right'
            });
            break;
        case 'cutButton':
            cutCopyButtonClick(state, 'cut');
            break;
        case 'copyButton':
            cutCopyButtonClick(state, 'copy');
            break;
        case 'pasteButton':
            pasteButtonClick(state);
            break;
        case 'sumButton':
            sumButtonClick();
            break;
        default:
            console.warn('bad button click', e);
    }
};


const eraseButtonClick = (state) => {

    state.activeCells.forEach((id) => state.allCells[id].input.value = '');

};


const cssButtonClick = (state, atts) => {;

    state.activeCells.forEach((id) => {

        const cell = state.allCells[id];

        // toggle property
        let style = cell.input.style;
        style[atts.key] = style[atts.key] === atts.value ? '' : atts.value;
    });
};


const cutCopyButtonClick = (state, type) => {

    state.activeCells = CellCommon.sortCellIdsByPosition(state.activeCells);
    $setState({ cutCopyCells: [], cutCopyType: type })

    let currentRow = [];
    let row;
    state.activeCells.forEach((id) => {

        const cell = _state.allCells[id];

        if (!row) {
            row = cell.row
        }

        if (row !== cell.row) {
            // clone array and push new row array into it
            const addedLastRow = state.cutCopyCells.concat();
            addedLastRow.push(currentRow);
            $setState({ cutCopyCells: addedLastRow })
            currentRow = [];
            row = cell.row;
        }
        currentRow.push(CellCommon.copyCell(cell));
    });
    // clone array and push new row array into it
    const addedLastRow = state.cutCopyCells.concat();
    addedLastRow.push(currentRow)
    $setState({ cutCopyCells: addedLastRow })
    return;
};


const pasteButtonClick = (state) => {

    // return if no active cells
    if (state.activeCells.length < 1) {
        console.warn('pasting with no active cells')
        return
    }

    // step 1: find 'first' active elemnt
    const firstActive = CellCommon.sortCellIdsByPosition(state.activeCells)[0];
    const firstRow = CellCommon.parseRow(firstActive);
    const firstColumn = CellCommon.parseColumn(firstActive);

    // step 2: set up looping of copy/paste rows (outer array)
    for (let r = 0; r < state.cutCopyCells.length; ++r) {

        const currentRow = state.cutCopyCells[r];
        for (let c = 0; c < currentRow.length; ++c) {

            const allCell = state.allCells[`r${firstRow + r}.c${firstColumn + c}`];
            if (!allCell) {
                break;
            }

            CellCommon.overwriteCellProps(allCell, state.cutCopyCells[r][c]);

            if (state.cutCopyType === 'cut') {
                const cutCell = state.allCells[state.cutCopyCells[r][c].id];
                CellCommon.clearCell(state, cutCell)
            }
        }
    }

    if (state.cutCopyType === 'cut') {
        $setState({ cutCopyType: 'copy' })
    }
};


const sumButtonClick = (state) => {

    if (!_state.activeCells || _state.activeCells.length < 2) {
        return;
    }

    const cellsByCol = {};
    let finalRow = _state.allCells[_state.activeCells[0]].row;
    _state.activeCells.forEach((id) => {

        const cell = _state.allCells[id]

        finalRow = cell.row > finalRow ? cell.row : finalRow;

        if (!cellsByCol[cell.column]) {
            cellsByCol[cell.column] = [];
        }
        cellsByCol[cell.column].push({
            val: cell.input.value || 0,
            column: cell.column,
            row: cell.row,
            id: cell.id
        })
    })

    Object.keys(cellsByCol).forEach((i) => {

        const sum = cellsByCol[i].reduce((a, b) => a += +b.val, 0);
        const column = cellsByCol[i][0].column;
        const cellToSum = _state.allCells[`r${finalRow + 1}.c${column}`]
        // const cellToSum = _state.allCells.find((c) => c.row === finalRow + 1 && c.column === column);

        _state.funcCellOutput[cellToSum.id] = cellsByCol[i].map((i) => i.id);

        cellsByCol[i].forEach((e) => {

            _state.funcCellInput[e.id] = [cellToSum.id];
        });
        cellToSum.input.value = sum;
    })
};


module.exports = {
    handleButtonClick,
    cutCopyButtonClick,
    pasteButtonClick
};
