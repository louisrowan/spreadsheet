'use strict';

const { $updateCell } = require('../state');

module.exports = (cell, e, clear) => {

    if (clear) {
        return $updateCell(cell, { value: '' });
    }

    const value = e.key;
    let currentVal = cell.input.value;

    if (value === 'Backspace') {
        if (!currentVal) return;
        return $updateCell(cell, { value: currentVal.slice(0,-1) });
    }
    $updateCell(cell, { value: currentVal ? currentVal += value : value });
    return;
};
