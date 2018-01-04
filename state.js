'use strict';

const _state = {
    allCells: [], // array of cell objects containing all cells in spreadsheet
    activeCells: [], // array of cell objects containing 'active' cells
    mousedown: false, // boolean to determine when mouseover is a drag event
    colDrag: false,
    rowDrag: false,
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

const $state = () => {

    return Object.assign({}, _state);
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

module.exports = {
    $state,
    $setState,
    _state
}
