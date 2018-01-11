'use strict';

const { COL_COUNT, ROW_COUNT } = require('./constants');
// const LoggerObject = require('./logger.js');
const ToolbarElement = require('./toolbar/elements');
const CellElement = require('./cell/elements');
const { _state } = require('./state');
const DraggableDiv = require('./draggableDiv').DraggableDiv;


// const Logger = new LoggerObject();
const main = document.getElementById('main');

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
_state.spreadsheetContainer = _spreadsheetContainer;


// add column headers
for (let i = -1; i < COL_COUNT; ++i) {

    const _header = new CellElement.ColumnHeader(i);
    _spreadsheetContainer.appendChild(_header.div);
    _state.columnHeaders.push(_header);
}

// timeout to paint screen and then add cells
process.nextTick(() => {
    for (let i = 0; i < ROW_COUNT; ++i) {

        const _row = new CellElement.RowHeader(i);
        _spreadsheetContainer.appendChild(_row.div);
        _state.rowHeaders.push(_row);

        for (let j = 0; j < COL_COUNT; ++j) {

            const _cell = new CellElement.Cell(i, j);
            _spreadsheetContainer.appendChild(_cell.div);
            _state.allCells[_cell.id] = _cell;
        }
    }
});

main.appendChild(new DraggableDiv());
require('./eventListener');


