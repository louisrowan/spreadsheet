'use strict';

const { $updateCell } = require('../state');

module.exports = (state, atts) => {

    let hasStyle = false;

    for (let i = 0; i < state.activeCells.length; ++i) {

        const cell = state.allCells[state.activeCells[i]];
        const style = cell.input.style;
        if (style[atts.key] && style[atts.key] === atts.value) {
            hasStyle = true;
            break;
        }
    }

    let style = {};
    if (hasStyle) {
        style[atts.key] = '';
    }
    else {
        style[atts.key] = atts.value;
    }

    state.activeCells.forEach((id) => {

        const cell = state.allCells[id];
        $updateCell(cell, { style });
    });
};
