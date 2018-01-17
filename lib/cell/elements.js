'use strict';

const Styles = require('./styles');
const { _state } = require('../state');
const Common = require('../common');
const { CELL_HEIGHT, CELL_WIDTH, COL_COUNT } = require('../constants');

function Cell (row, column) {

    // create elements
    this.div = document.createElement('div');
    this.input = document.createElement('input');
    
    // set props
    this.id = `r${row}.c${column}`;
    this.input.setAttribute('id', `cell-${this.id}`);
    this.row = row;
    this.column = column;
    this.active = false;

    this.input.setAttribute('readonly', 'true');

    // add styles
    Styles.cellStyle(this.div);
    Styles.inputStyle(this.input);

    // connect elements and add cell to allCells array
    this.div.appendChild(this.input);

    return this;
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

            return a += Common.translatePxToNum(b.div.style.width);
        }, 0);
    };

    // add styles
    Styles.cellStyle(this.div);
    Styles.headerCellStyle(this.div);
    this.span.style.height = this.div.style.height;
    Styles.columnHeaderSpanStyle(this.span);
    Styles.columnHeaderTextStyle(this.textElement);

    this.span.setAttribute('id', `colHeader.${column}`)
    this.span.setAttribute('class', 'colHeader')

    // connect elements
    this.div.appendChild(this.span);
    this.div.appendChild(this.textElement);

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
    };
}());


function RowHeader (row) {

    // create elements
    this.div = document.createElement('div');
    this.span = document.createElement('div');
    this.textElement = document.createElement('td');

    // set props
    this.row = row;
    this.position = () => {

        return _state.rowHeaders.slice(0, row).reduce((a, b) => {

            return a += Common.translatePxToNum(b.div.style.height);
        }, 100 + CELL_HEIGHT);
    };
    this.textElement.innerText = row + 1 > 0 ? row + 1 : '';

    // add styles
    Styles.cellStyle(this.div);
    Styles.headerCellStyle(this.div);
    Styles.columnHeaderTextStyle(this.textElement);
    Styles.rowHeaderSpanStyle(this.span, this.div);

    this.span.setAttribute('id', `rowHeader.${row}`)
    this.span.setAttribute('class', 'rowHeader')

    // connect elements
    this.div.appendChild(this.span);
    this.div.appendChild(this.textElement);

    return this;
}


function SpreadsheetContainer () {

    this.div = document.createElement('div');
    this.div.setAttribute('id', 'spreadsheet-div');
    this.div.style.padding = '0px';
    this.div.style.margin = '0px';
    this.div.style.width = `${CELL_WIDTH * (COL_COUNT + 1)}px`;

    return this.div;
}


module.exports = {
    Cell,
    ColumnHeader,
    RowHeader,
    SpreadsheetContainer
};
