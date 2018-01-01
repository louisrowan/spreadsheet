'use strict';

const _state = {
    allCells: [], // array of cell objects containing all cells in spreadsheet
    activeCells: [], // array of cell objects containing 'active' cells
    mousedown: false, // boolean to determine when mouseover is a drag event
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

// const _getState = (key) => {

//     const newState = Object.assign({}, { [key]: _state[key]});
//     return newState[key]
// }

// const _setState = (key, newValue) => {

//     console.log('in set state', _state[key]);
//     console.log('key', key);

//     _state[key] = newValue;

//     console.log('and now', _state[key]);
//     return;
// }