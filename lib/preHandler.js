'use strict';

// const CellHandlers = require('./eventHandlers');
const Handlers = require('./handlers');


exports.cellMousedown = (state, cell) => {

    // CellHandlers.handleCellMousedown(state, cell);
    Handlers.cellMousedown(state, cell);
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


exports.enableCommandActive = () => {

    Handlers.enableCommandActive();
};


exports.commandActiveKeydown = (state, e) => {

    if (e.key === 'c') {
        e.preventDefault();
        // ToolbarListeners.cutCopyButtonClick(state, 'copy');
        Handlers.clickCutCopy(state, 'copy')
        return;
    }
    else if (e.key === 'x') {
        e.preventDefault();
        // ToolbarListeners.cutCopyButtonClick(state, 'cut');
        Handlers.clickCutCopy(state, 'cut')
        return;
    }
    else if (e.key === 'v') {
        e.preventDefault();
        // ToolbarListeners.pasteButtonClick(state);
        Handlers.clickPaste(state);
        return;
    }
    return;
};


exports.keyup = () => {

    Handlers.keyup()
};


exports.toolbarButtonClick = (state, e) => {

    if (!e.target.id) return;

    switch (e.target.id) {
        case 'deleteButton':
            // eraseButtonClick(state);
            Handlers.clickDelete(state);
            break;
        case 'boldButton':
            // cssButtonClick(state, { key: 'fontWeight', value: 'bold' });
            Handlers.clickCss(state, { key: 'fontWeight', value: 'bold' });
            break;
        case 'italicButton':
            // cssButtonClick(state, { key: 'fontStyle', value: 'italic' });
            Handlers.clickCss(state, { key: 'fontStyle', value: 'italic' });
            break;
        case 'underlineButton':
            // cssButtonClick(state, { key: 'textDecoration', value: 'underline' });
            Handlers.clickCss(state, { key: 'textDecoration', value: 'underline' });
            break;
        case 'leftalignButton':
            // cssButtonClick(state, { key: 'textAlign', value: 'left' });
            Handlers.clickCss(state, { key: 'textAlign', value: 'left' });
            break;
        case 'centeralignButton':
            // cssButtonClick(state, { key: 'textAlign', value: 'center' });
            Handlers.clickCss(state, { key: 'textAlign', value: 'center' });
            break;
        case 'rightalignButton':
            // cssButtonClick(state, { key: 'textAlign', value: 'right' });
            Handlers.clickCss(state, { key: 'textAlign', value: 'right' });
            break;
        case 'cutButton':
            // cutCopyButtonClick(state, 'cut');
            Handlers.clickCutCopy(state, 'cut');
            break;
        case 'copyButton':
            // cutCopyButtonClick(state, 'copy');
            Handlers.clickCutCopy(state, 'copy')
            break;
        case 'pasteButton':
            // pasteButtonClick(state);
            Handlers.clickPaste(state);
            break;
        case 'sumButton':
            // sumButtonClick(state);
            Handlers.clickSum(state);
            break;
        default:
            console.warn('bad button click', e);
    }
};
