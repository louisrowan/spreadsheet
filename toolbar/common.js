'use strict';

exports.getColumnCount = (cells) => {

    // determine # of columns that copied cell rectangle contains
    let cols = 0;
    for (let i = 0; i < cells.length; ++i) {
        const currentCell = cells[i];
        if (currentCell.row != cells[0].row) {
            break;
        }
        ++cols;
    }
    return cols;
};
