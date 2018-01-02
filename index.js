'use strict';

const LoggerObject = require('./logger.js');
const ToolbarElement = require('./toolbar/elements');
const CellElement = require('./cell/elements');
const _state = require('./state')._state;
const DraggableDiv = require('./draggableDiv').DraggableDiv;

const Logger = new LoggerObject();
const main = document.getElementById('main');

window.ROW_COUNT = 10;
window.COL_COUNT = 10;
window.CELL_WIDTH = 80;
window.CELL_HEIGHT = 40;

const body = document.body;
body.style.padding = '0px';
body.style.margin = '0px';


// add nav bar
const _toolbar = new ToolbarElement.Toolbar();
main.appendChild(_toolbar);
main.appendChild(new ToolbarElement.ToolbarBuffer());

// add spreadsheet container
const _spreadsheetContainer = new CellElement.SpreadsheetContainer();
main.appendChild(_spreadsheetContainer);


// add column headers
for (let i = -1; i < COL_COUNT; ++i) {

    const _header = new CellElement.ColumnHeader(i);
    _spreadsheetContainer.appendChild(_header.div);
    _state.columnHeaders.push(_header);
}

// timeout to paint screen and then add cells
setTimeout(() => {
    for (let i = 0; i < ROW_COUNT; ++i) {

        const _row = new CellElement.RowHeader(i);
        _spreadsheetContainer.appendChild(_row.div);
        _state.rowHeaders.push(_row);

        for (let j = 0; j < COL_COUNT; ++j) {

            const _cell = new CellElement.Cell(i, j);
            _spreadsheetContainer.appendChild(_cell.div);
        }
    }
}, 0);

main.appendChild(new DraggableDiv());
require('./window');
