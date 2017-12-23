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