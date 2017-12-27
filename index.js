'use strict';

const Logger = new LoggerObject();
const main = document.getElementById('main');

const ROW_COUNT = 8;
const COL_COUNT = 8;
const CELL_WIDTH = 80;
const CELL_HEIGHT = 40;

const body = document.body;
body.style.padding = '0px';
body.style.margin = '0px';


// add nav bar
const _toolbar = new Toolbar();
main.appendChild(_toolbar);
main.appendChild(new ToolbarBuffer);

// add spreadsheet container
const _spreadsheetContainer = new SpreadsheetContainer();
main.appendChild(_spreadsheetContainer);


// add column headers
for (let i = -1; i < COL_COUNT; ++i) {

    const _header = new ColumnHeader(i);
    _spreadsheetContainer.appendChild(_header.div);
    _state.columnHeaders.push(_header);
    _header.position = _header.div.getBoundingClientRect().x;
}

// add cells
for (let i = 0; i < ROW_COUNT; ++i) {

    const _row = new RowHeader(i);
    _spreadsheetContainer.appendChild(_row.div);
    _state.rowHeaders.push(_row);
    _row.position = _row.div.getBoundingClientRect().y;

    for (let j = 0; j < COL_COUNT; ++j) {

        const _cell = new Cell(i, j);
        _spreadsheetContainer.appendChild(_cell.div);
    }
}

main.appendChild(new DraggableDiv());
