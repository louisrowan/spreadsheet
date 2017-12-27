'use strict';

function Cell (row, column) {

    // set props
    this.div = document.createElement('div');
    this.input = document.createElement('input');
    this.div.appendChild(this.input);
    this.id = Math.random().toString();
    this.input.setAttribute('id', `cell-${this.id}`);
    this.row = row;
    this.column = column;

    // add styles
    cellStyle(this.div);
    inputStyle(this.input);

    // event listeners
    this.input.addEventListener('input', (e) => cellInput(this, e));
    this.input.addEventListener('mousedown', (e) => cellMousedown(this, e));
    this.input.addEventListener('mouseover', (e) => cellMouseover(this, e));

    _state.allCells.push(this);
    return this;
}

Cell.prototype.getText = function() {

    return this.input.value;
}

Cell.prototype.setText = function(val) {

    this.input.value = val;
    return this.input.value;
}


function ColumnHeader (column) {

    this.div = document.createElement('div');
    this.column = column;
    this.position = {};

    cellStyle(this.div);
    headerCellStyle(this.div);
    this.div.style.position = 'relative'

    this.span = document.createElement('div');
    this.div.appendChild(this.span);
    this.span.style.height = this.div.style.height;
    this.span.style.width = '2px';
    this.span.style.background = 'black';
    this.span.style.position = 'relative';
    this.span.style.display = 'inline-block';
    this.span.style.right = '2px';
    this.span.style.cursor = 'col-resize';
    this.span.style['boxSizing'] = 'border-box';

    this.span.addEventListener('mousedown', (e) => _state.colDrag = this);

    this.tableCell = document.createElement('td');
    this.tableCell.innerText = column + 1 > 0 ? column + 1 : '';
    this.tableCell.style.width = '100%';
    this.tableCell.style.height = '100%';
    this.tableCell.style.position = 'absolute';
    this.tableCell.style.left = '0px';
    this.tableCell.style.right = '0px';
    this.tableCell.style.top = '0px';
    this.tableCell.style.bottom = '0px';
    this.tableCell.style['textAlign'] = 'center';
    this.tableCell.style['paddingTop'] = (CELL_HEIGHT/3) + 'px';
    this.div.appendChild(this.tableCell)

    // this.p.innerText = column + 1 > 0 ? column + 1 : '';
    // this.p.innerText = column + 1 > 0 ? column + 1 : '';
    // this.div.appendChild(this.p);

    return this;
}


const letters = 'abcdefghijklmnopqrstuvwxyz'


function RowHeader (row) {

    this.div = document.createElement('div');
    this.row = row;
    this.position = {};

    cellStyle(this.div);
    headerCellStyle(this.div);
    this.div.style.float = 'left';

    this.span = document.createElement('div');
    this.div.appendChild(this.span);
    this.span.style.width = this.div.style.width;
    this.span.style.height = '2px';
    this.span.style.background = 'black';
    this.span.style.position = 'relative';
    this.span.style.top = this.div.style.height + 2 + 'px';
    this.span.style.cursor = 'row-resize';
    this.span.style['boxSizing'] = 'border-box';

    this.span.addEventListener('mousedown', (e) => _state.rowDrag = this);

    this.p = document.createElement('p');
    this.p.innerText = letters[row] || '';
    this.p.style['textAlign'] = 'center';
    this.div.appendChild(this.p);

    return this;
}

function SpreadsheetContainer () {

    this.div = document.createElement('div');
    this.div.style.padding = '0px';
    this.div.style.margin = '0px';
    this.div.style.width = `${CELL_WIDTH * (COL_COUNT + 1)}px`;

    return this.div;
}
