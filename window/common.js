'use strict;'

const _state = require('../state')._state;

const getCell = (e) => {

    const input = e.target.id;
    if (!input) return;
    const cell = _state.allCells.find((c) => c.id === input.slice(5)); // input id are prefaced with 'cell-' to slice first 5 char
    if (!cell) return;
    return cell;
}

module.exports = {
    getCell
}
