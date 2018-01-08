'use strict';

const _state = {
    allCells: {}, // object containing all cells.  key: id, value: cell
    activeCells: [], // array of cell object id's that are currently 'active'
    mousedown: false, // boolean to determine when mouseover is a drag event
    colDrag: false, // boolean to determine if column width drag is active
    rowDrag: false, // boolean to determine if row height drag is active
    draggableDiv: {}, // htmlElement that is used to show multi-selection and drag events
    startCellRect: {}, // cell at start of draggableDiv
    endCellRect: {}, // cell at end of draggableDiv
    cutCopy: {
        type: '', // string indicating if action is cut or copy
        cells: [] // array of cell objects containing cells on cut/copy clipboard
    },
    commandActive: false, // boolean to determine if command key is being held down
    columnHeaders: [], // array of column header objects
    rowHeaders: [], //  array of row header objects,
    funcCellOutput: {}, // obj containing summed cells by id with array of cells to sum
    funcCellInput: {} // obj containing cells by id with array of funcCellOutput linked
};

const $state = (path) => {

    if (!path) {
        return _state;
    }

    path = path.split(':');
    let current = _state;
    for (let i = 0; i < path.length; ++i) {
        current = current[path[i]];
    }

    return current;
}


const $setState = (args) => {

    return Object.assign(_state, args)
}


const $updateCell = (cell, newProps) => {

    let tmp = cell;
    if (typeof cell === 'string') {
        cell = _state.allCells[cell];
    }

    if (!cell) {
        console.warn('no cell found for', tmp)
    }

    console.log('in update cell', cell);

    const t = Object.assign(cell, newProps)

    console.log(t);

    return Object.assign(cell, newProps);
}


module.exports = {
    $state,
    $setState,
    $updateCell,
    _state
}
