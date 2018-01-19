'use strict';

const Handlers = require('./handlers');


exports.cellInput = (args) => {

    const { state, e, clear } = args;

    const cell = args.cell || state.startCellRect;
    if (!cell) return;

    Handlers.cellInput(cell, e, clear);

    if (state.funcCellOutput[cell.id]) {
        Handlers.funcCellOutput(state, cell);
    }
    if (state.funcCellInput[cell.id]) {
        Handlers.funcCellInput(state, cell);
    }
    return;
};


exports.cellMousedown = (state, cell) => {

    return Handlers.cellMousedown(state, cell);
};


exports.cellMouseover = (state, cell) => {

    return Handlers.cellDrag(state, cell);
};


exports.commandActiveKeydown = (state, e) => {

    if (e.key === 'c') {
        e.preventDefault();
        return Handlers.clickCutCopy(state, 'copy');
    }
    else if (e.key === 'x') {
        e.preventDefault();
        return Handlers.clickCutCopy(state, 'cut');
    }
    else if (e.key === 'v') {
        e.preventDefault();
        return Handlers.clickPaste(state);
    }
    return;
};


exports.enableCommandActive = () => {

    return Handlers.enableCommandActive();
};


exports.enableShiftActive = () => {

    return Handlers.enableShiftActive();
};


exports.headerMousedown = (type, e) => {

    let id = e.target.id.split('.');
    id = id[1];

    return Handlers.headerMousedown(type, id);
};


exports.keyup = (e) => {

    return Handlers.keyup(e);
};


exports.mouseup = (state) => {

    return Handlers.mouseup(state);
};


exports.navigateCells = (state, e) => {

    return Handlers.navigateCells(state, e);
};


exports.resizeRowColumn = (state, e, value) => {

    return Handlers.resizeRowColumn(state, e, value);
};


exports.shiftActiveKeydown = (state, e) => {

    if (e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown') {
        return Handlers.keydownExpandCellRect(state, e);
    }
    return;
};


exports.toolbarButtonClick = (state, e) => {

    if (!e.target.id) return;

    switch (e.target.id) {
        case 'deleteButton':
            return Handlers.clickDelete(state);
        case 'textSize11Button':
            return Handlers.clickCss(state, { key: 'fontSize', value: '11px' });
       case 'textSize16Button':
            return Handlers.clickCss(state, { key: 'fontSize', value: '16px' });
       case 'textSize20Button':
            return Handlers.clickCss(state, { key: 'fontSize', value: '20px' });
        case 'boldButton':
            return Handlers.clickCss(state, { key: 'fontWeight', value: 'bold' });
        case 'italicButton':
            return Handlers.clickCss(state, { key: 'fontStyle', value: 'italic' });
        case 'underlineButton':
            return Handlers.clickCss(state, { key: 'textDecoration', value: 'underline' });
        case 'leftalignButton':
            return Handlers.clickCss(state, { key: 'textAlign', value: 'left' });
        case 'centeralignButton':
            return Handlers.clickCss(state, { key: 'textAlign', value: 'center' });
        case 'rightalignButton':
            return Handlers.clickCss(state, { key: 'textAlign', value: 'right' });
        case 'cutButton':
            return Handlers.clickCutCopy(state, 'cut');
        case 'copyButton':
            return Handlers.clickCutCopy(state, 'copy');
        case 'pasteButton':
            return Handlers.clickPaste(state);
        case 'sumButton':
            return Handlers.clickSum(state);
        default:
            return console.warn('Bad button click in toolbarButtonClick handler', e); // eslint-disable-line
    }
};
