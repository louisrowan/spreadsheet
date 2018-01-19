'use strict';

const { $updateCell } = require('../state');

// Declare internals

const internals = {
    validInput: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+]}{| [;:\'"/\\?.>,<Backspace'
};


module.exports = (cell, e, clear) => {

    if (clear) {
        return $updateCell(cell, { value: '' });
    }

    if (!internals.validInput.includes(e.key)) {
        return;
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
