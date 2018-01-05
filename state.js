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

    if (typeof args !== 'object') {
        console.warn('bad input for set state', args)
    }

    Object.keys(args).forEach((key) => {

        const oldState = _state[key];
        if (!oldState && oldState != false) {
            console.warn('bad request for', key, _state, _state[key])
            return;
        }

        const newState = args[key];
        _state[key] = newState;
    })

    return _state;
}

const $cell = (id) => {

    const copyCell = require('./cell/common').copyCell;

    return copyCell(_state.allCells[id]) || console.warn('cell', id, 'not found');
}

const $setCell = (args) => {

    if (typeof args !== 'object') {
        console.warn('bad input for set cell', args)
    }

    Object.keys(args).forEach((cell) => {

        const oldCell = _state.allCells[cell.id];
        if (!oldCell) {
            console.warn('bad set cell request for', cell);
            return
        }

        const newCell = args[cell];
        oldCell = newCell;
    })

    return;
}

module.exports = {
    $cell,
    $setCell,
    $state,
    $setState,
    _state
}
