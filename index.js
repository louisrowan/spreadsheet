'use strict';

const Logger = new LoggerObject();
const main = document.getElementById('main');

const ROW_COUNT = 5;
const COL_COUNT = 5;

main.style.width = `${100 * (COL_COUNT + 1)}px`;

const body = document.body;
body.style.padding = '0px';
body.style.margin = '0px';


// add nav bar
main.appendChild(new Toolbar());


// add column headers
for (let i = -1; i < COL_COUNT; ++i) {

    const _header = new ColumnHeader(i);
    main.appendChild(_header.div);
    _state.columnHeaders.push(_header);
    _header.position = _header.div.getBoundingClientRect().x;
}

// add cells
for (let i = 0; i < ROW_COUNT; ++i) {

    const _row = new RowHeader(i);
    main.appendChild(_row.div);
    _state.rowHeaders.push(_row);
    _row.position = _row.div.getBoundingClientRect().y;

    for (let j = 0; j < COL_COUNT; ++j) {

        let _cell = new Cell(i, j);

        main.appendChild(_cell.div);
    }
}

main.appendChild(new DraggableDiv());


