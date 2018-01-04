'use strict;'

const $state = require('../state').$state;

const getCell = (e) => {

    const input = e.target.id;
    if (!input) return;
    const cell = $state().allCells[input.slice(5)]; // input id are prefaced with 'cell-' to slice first 5 char
    if (!cell) return;
    return cell;
}

module.exports = {
    getCell
}
