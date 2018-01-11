'use strict';

// const CellHandlers = require('./eventHandlers');
const Handlers = require('./handlers');


exports.cellMousedown = (state, cell) => {

    // CellHandlers.handleCellMousedown(state, cell);
    Handlers.cellMousedown(state, e);
};


exports.cellMouseover = (state, cell) => {

    // CellHandlers.handleDrag(state, cell);
    Handlers.cellDrag(state, cell);
};


exports.cellInput = (state, cell) => {

    if (state.funcCellOutput[cell.id]) {
        // CellHandlers.handleFuncCellOutput(state, cell);
        Handlers.funcCellOutput(state, cell);
    }
    if (state.funcCellInput[cell.id]) {
        // CellHandlers.handleFuncCellInput(state, cell);
        Handlers.funcCellInput(state, cell);
    }
    return;
};

exports.resizeRowColumn = (state, e, value) => {

    Handlers.resizeRowColumn(state, e, value);
};


exports.mouseup = () => {

    Handlers.mouseup();
};


exports.navigateCells = (state, e) => {

    Handlers.navigateCells(state, e);
};


exports.enableCommandActive = (state, e) => {

    Handlers.enableCommandActive();
};


exports.commandActiveKeydown = (state, e) => {

    Handlers.commandActiveKeydown(state, e);
};


exports.keyup = () => {

    Handlers.keyup()
};


exports.toolbarButtonClick = (state, e) => {


};
