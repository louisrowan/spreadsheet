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



function updateWidth (element, widthDiff) {

    let originalWidth = element.style.width;
    // console.log('original = ', originalWidth);
    originalWidth = originalWidth.substring(0, originalWidth.length - 2);
    const newWidth = (+originalWidth + +widthDiff) + 'px';
    element.style.width = newWidth;
    // console.log('newWidth = ', element.style.width);
    return;
}


function updateHeight (element, heightDiff) {

    let originalHeight = element.style.height;
    // console.log('original = ', originalWidth);
    originalHeight = originalHeight.substring(0, originalHeight.length - 2);
    const newHeight = (+originalHeight + +heightDiff) + 'px';
    element.style.height = newHeight;
    // console.log('newWidth = ', element.style.width);
    return;
}




function ColumnHeader (column) {

    this.div = document.createElement('div');
    this.div.style.border = '1px solid rgb(238, 238, 238)';
    this.div.style['boxSizing'] = 'border-box';
    this.div.style.background = 'whitesmoke';
    cellStyle(this.div);
    this.column = column;

    this.span = document.createElement('div');
    this.div.appendChild(this.span);
    this.span.style.height = this.div.style.height;
    this.span.style.width = '2px';
    this.span.style.background = 'black';
    // this.span.style.border = '2px solid black';
    this.span.style.position = 'relative';
    this.span.style.display = 'inline-block';
    this.span.style.right = '2px';
    this.span.style.cursor = 'col-resize';
    this.span.style['boxSizing'] = 'border-box';
    this.position = {};

    this.span.addEventListener('mousedown', (e) => {

        // console.log('clicked');
        _state.colDrag = this;
    })

    return this;
}


function RowHeader (row) {

    this.div = document.createElement('div');

    cellStyle(this.div);
    this.row = row;

    this.div.style.border = '1px solid rgb(238, 238, 238)';
    this.div.style['boxSizing'] = 'border-box';
    this.div.style.background = 'whitesmoke';
    this.div.style.float = 'left';

    this.span = document.createElement('div');
    this.div.appendChild(this.span);
    this.span.style.width = this.div.style.width;
    this.span.style.height = '2px';
    this.span.style.background = 'black';
    this.span.style.position = 'relative';
    // this.span.style.display = 'inline-block';
    this.span.style.top = this.div.style.height + 2 + 'px';
    this.span.style.cursor = 'row-resize';
    this.span.style['boxSizing'] = 'border-box';
    // this.position = {};


    this.span.addEventListener('mousedown', (e) => {

        // console.log('clicked');
        _state.rowDrag = this;
    })

    return this;
}


for (let i = 0; i < COL_COUNT + 1; ++i) {

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


