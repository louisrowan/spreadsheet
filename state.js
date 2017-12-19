'use strict';

const _state = {
    allCells: [], // array of cell objects containing all cells in spreadsheet
    activeCells: [], // array of cell objects containing 'active' cells
    mousedown: false, // boolean to determine when mouseover is a drag event
    draggableDiv: {}, // htmlElement that is used to show multi-selection and drag events
    startCellRect: {}, // cell at start of draggableDiv
    endCellRect: {}, // cell at end of draggableDiv
    copy: {}, // array of cell objects containing cells on cut/copy clipboard
    commandActive: false // boolean to determine if command key is being held down
};
