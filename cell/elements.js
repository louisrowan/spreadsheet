'use strict';

function Cell (row, column) {

    // create elements
    this.div = document.createElement('div');
    this.input = document.createElement('input');
    
    // set props
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

    // connect elements and add cell to allCells array
    this.div.appendChild(this.input);
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

    // create elements
    this.div = document.createElement('div');
    this.span = document.createElement('div');
    this.textElement = document.createElement('td');

    // set props
    this.column = column;
    this.textElement.innerText = column < 0 ? '' : getLetter();
    this.position = () => {

        return _state.columnHeaders.slice(0, column + 1).reduce((a, b) => {

            return a += translatePxToNum(b.div.style.width);
        }, 0)
    }

    // add styles
    cellStyle(this.div);
    headerCellStyle(this.div);
    this.span.style.height = this.div.style.height;
    columnHeaderSpanStyle(this.span);
    columnHeaderTextStyle(this.textElement);

    // event listeners
    this.span.addEventListener('mousedown', (e) => _state.colDrag = this);

    // connect elements
    this.div.appendChild(this.span);
    this.div.appendChild(this.textElement)

    return this;
}


const getLetter = (function() {

    const letters = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    let prefixIndex = -1;
    let prefix = '';
    let letterIndex = 0;

    return () => {

        let result;
        if (letters[letterIndex]) {
            result = prefix + letters[letterIndex];
        }
        else {
            letterIndex = 0;
            ++prefixIndex;
            prefix = letters[prefixIndex];
            result = prefix + letters[letterIndex];
        }
        ++letterIndex;
        return result;
    }
}())

function RowHeader (row) {

    // create elements
    this.div = document.createElement('div');
    this.span = document.createElement('div');
    this.textElement = document.createElement('td');

    // set props
    this.row = row;
    this.position = () => {

        return _state.rowHeaders.slice(0, row).reduce((a, b) => {

            return a += translatePxToNum(b.div.style.height);
        }, 100 + CELL_HEIGHT)
    }
    this.textElement.innerText = row + 1 > 0 ? row + 1 : '';

    // add styles
    cellStyle(this.div);
    headerCellStyle(this.div);
    columnHeaderTextStyle(this.textElement);
    rowHeaderSpanStyle(this.span, this.div);

    // event listeners
    this.span.addEventListener('mousedown', (e) => _state.rowDrag = this);

    // connect elements
    this.div.appendChild(this.span);
    this.div.appendChild(this.textElement);

    return this;
}

function SpreadsheetContainer () {

    this.div = document.createElement('div');
    this.div.style.padding = '0px';
    this.div.style.margin = '0px';
    this.div.style.width = `${CELL_WIDTH * (COL_COUNT + 1)}px`;

    return this.div;
}
