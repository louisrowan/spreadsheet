'use strict';

const Prehandler = require('../preHandler');


module.exports = (state) => {

    state.activeCells.forEach((id) => {

        const cell = state.allCells[id];

        Prehandler.cellInput({
            state,
            e: {},
            cell,
            clear: true
        });
    });
};
