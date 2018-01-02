/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const _state = {
    allCells: [], // array of cell objects containing all cells in spreadsheet
    activeCells: [], // array of cell objects containing 'active' cells
    mousedown: false, // boolean to determine when mouseover is a drag event
    draggableDiv: {}, // htmlElement that is used to show multi-selection and drag events
    startCellRect: {}, // cell at start of draggableDiv
    endCellRect: {}, // cell at end of draggableDiv
    cutCopy: {
        type: '', // string indicating if action is cut or copy
        cells: [] // array of cell objects containing cells on cut/copy clipboard
    },
    commandActive: false, // boolean to determine if command key is being held down
    columnHeaders: [], // array of column header objects
    rowHeaders: [], //  array of row header objects,
    funcCellOutput: {}, // obj containing summed cells by id with array of cells to sum
    funcCellInput: {} // obj containing cells by id with array of funcCellOutput linked
};

// const _getState = (key) => {

//     const newState = Object.assign({}, { [key]: _state[key]});
//     return newState[key]
// }

// const _setState = (key, newValue) => {

//     console.log('in set state', _state[key]);
//     console.log('key', key);

//     _state[key] = newValue;

//     console.log('and now', _state[key]);
//     return;
// }

module.exports = {
    _state
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const _state = __webpack_require__(0)._state;
const Common = __webpack_require__(2);
const CellElement = __webpack_require__(5);
const Styles = __webpack_require__(3);

function newSelectedCell(cell) {

    deactivateAllCells();
    addToActiveCells(cell);
    cell.input.style.border = '2px solid green';

    _state.startCellRect = cell;
    _state.endCellRect = {};

    const draggableDiv = _state.draggableDiv;
    const bound = getCellBounding(cell);

    draggableDiv.style.visibility = 'visible';
    draggableDiv.style.left = bound.x + 'px';
    draggableDiv.style.top = bound.y + 'px';
    draggableDiv.style.width = '0px';
    draggableDiv.style.height = '0px';

    return;
};

function copyCell (cell) {

    const newCell = new CellElement.Cell();
    newCell.input.value = cell.input.value;
    newCell.copied = true;

    return newCell;
};

function sortCellsByPosition (cells) {

    return cells.sort((a, b) => {

        return a.row - b.row || a.column - b.column;
    });
};

function isSameCell (cell1, cell2) {

    return cell1.row === cell2.row && cell1.column === cell2.column;
}

function clearCell (cell) {

    const CellListeners = __webpack_require__(6);

    cell.input.value = '';
    Styles.inputStyle(cell.input);
    CellListeners.cellInput(cell);
}

function getCellBounding (cell) {

    const column = _state.columnHeaders[cell.column + 1];
    const row = _state.rowHeaders[cell.row];
    
    return {
        x: column.position(),
        y: row.position(),
        width: Common.translatePxToNum(cell.div.style.width),
        height: Common.translatePxToNum(cell.div.style.height)
    }
}

function addToActiveCells (cell) {

    if (!_state.activeCells.find((active) => active.id === cell.id)) {
        _state.activeCells.push(cell);
        cell.active = true;
    }
    return;
}

function removeFromActiveCells(cell) {

    const index = _state.activeCells.indexOf(cell);
    if (index > -1) {
        _state.activeCells.splice(index, 1);
        cell.input.style.border = '1px solid rgb(238, 238, 238)';
        cell.input.style.background = 'white';
        cell.active = false;
    }
    return;
}

function deactivateAllCells() {

    _state.allCells.forEach((cell) => removeFromActiveCells(cell));
    return;
}

module.exports = {
    newSelectedCell,
    copyCell,
    sortCellsByPosition,
    isSameCell,
    clearCell,
    getCellBounding,
    addToActiveCells,
    removeFromActiveCells,
    deactivateAllCells
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function updateHeightWidth (element, diff, prop) {

    const original = translatePxToNum(element.style[prop]);
    const updated = `${+original + +diff}px`;
    element.style[prop] = updated;
    return;
}

function translatePxToNum (px) {

    return +(px.slice(0, -2));
}

module.exports = {
    updateHeightWidth,
    translatePxToNum
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function cellStyle(div) {

    const style = div.style;
    
    style.width = CELL_WIDTH + 'px';
    style.height = CELL_HEIGHT + 'px';
    style.float = 'left';
    return;
}

function inputStyle(input) {

    const style = input.style;
    
    style.width = '100%';
    style.height = '100%';
    style.outline = 'none';
    style.border = '1px solid rgb(238, 238, 238)';
    style.cursor = 'cell';
    style['boxSizing'] = 'border-box';
    style['fontWeight'] = 'normal';
    style['fontStyle'] = 'normal';
    style['textDecoration'] = 'none';
    style['textAlign'] = 'left';
    return;
}

function headerCellStyle (div) {

    const style = div.style;

    style.border = '1px solid rgb(238, 238, 238)';
    style.background = 'whitesmoke';
    style.position = 'relative';
    style['boxSizing'] = 'border-box';
    return;
}

function columnHeaderSpanStyle (div) {

    const style = div.style;

    style.width = '2px';
    style.background = 'gray';
    style.position = 'relative';
    style.display = 'inline-block';
    style.right = '2px';
    style.cursor = 'col-resize';
    style['boxSizing'] = 'border-box';
    return;
}

function rowHeaderSpanStyle (span, div) {

    const style = span.style;

    style.width = div.style.width;
    style.height = '2px';
    style.background = 'gray';
    style.position = 'absolute';
    style.top = '-2px';
    style.cursor = 'row-resize';
    style['boxSizing'] = 'border-box';
    return;
}

function columnHeaderTextStyle (element, height) {

    const style = element.style;

    style.width = '100%';
    style.height = '100%';
    style.position = 'absolute';
    style.left = '0px';
    style.right = '0px';
    style.top = '0px';
    style.bottom = '0px';
    style['textAlign'] = 'center';
    style['pointerEvents'] = 'none';
    style['paddingTop'] = (CELL_HEIGHT/3) + 'px';
    return;
}

module.exports = {
    cellStyle,
    inputStyle,
    headerCellStyle,
    columnHeaderSpanStyle,
    rowHeaderSpanStyle,
    columnHeaderTextStyle
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const _state = __webpack_require__(0)._state;
const CellCommon = __webpack_require__(1);
const ToolbarHandlers = __webpack_require__(14);

function eraseButton_Click () {

    _state.activeCells.forEach((cell) => cell.input.value = '');
}

function cssButton_Click (atts) {

    _state.activeCells.forEach((cell) => {

        // toggle property
        let style = cell.input.style;
        style[atts.key] = style[atts.key] === atts.value ? '' : atts.value;
    });
}

function cutCopyButton_Click (type) {

    CellCommon.sortCellsByPosition(_state.activeCells);
    _state.cutCopy.type = type;
    _state.cutCopy.cells = _state.activeCells.map((c) => {

        const copied = CellCommon.copyCell(c);
        copied.row = c.row;
        copied.column = c.column
        return copied;
    });
}

function pasteButton_Click () {

    ToolbarHandlers.handlePaste();
}

function sumButton_Click () {

    if (!_state.activeCells || _state.activeCells.length < 2) {
        return;
    }

    const cellsByCol = {};
    let finalRow = _state.activeCells[0].row;
    _state.activeCells.forEach((cell) => {

        finalRow = cell.row > finalRow ? cell.row : finalRow;

        if (!cellsByCol[cell.column]) {
            cellsByCol[cell.column] = [];
        }
        cellsByCol[cell.column].push({
            val: cell.input.value || 0,
            column: cell.column,
            row: cell.row,
            id: cell.id
        })
    })

    Object.keys(cellsByCol).forEach((i) => {

        const sum = cellsByCol[i].reduce((a, b) => a += +b.val, 0);
        const column = cellsByCol[i][0].column;
        const cellToSum = _state.allCells.find((c) => c.row === finalRow + 1 && c.column === column);

        _state.funcCellOutput[cellToSum.id] = cellsByCol[i].map((i) => i.id);

        cellsByCol[i].forEach((e) => {

            _state.funcCellInput[e.id] = [cellToSum.id];
        });
        cellToSum.input.value = sum;
    })
}

module.exports = {
    eraseButton_Click,
    cssButton_Click,
    cutCopyButton_Click,
    pasteButton_Click,
    sumButton_Click
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Styles = __webpack_require__(3);
const _state = __webpack_require__(0)._state;
const Common = __webpack_require__(2);

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

    // add styles
    Styles.cellStyle(this.div);
    Styles.inputStyle(this.input);

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

            return a += Common.translatePxToNum(b.div.style.width);
        }, 0)
    }

    // add styles
    Styles.cellStyle(this.div);
    Styles.headerCellStyle(this.div);
    this.span.style.height = this.div.style.height;
    Styles.columnHeaderSpanStyle(this.span);
    Styles.columnHeaderTextStyle(this.textElement);

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

            return a += Common.translatePxToNum(b.div.style.height);
        }, 100 + CELL_HEIGHT)
    }
    this.textElement.innerText = row + 1 > 0 ? row + 1 : '';

    // add styles
    Styles.cellStyle(this.div);
    Styles.headerCellStyle(this.div);
    Styles.columnHeaderTextStyle(this.textElement);
    Styles.rowHeaderSpanStyle(this.span, this.div);

    // event listeners
    this.span.addEventListener('mousedown', (e) => _state.rowDrag = this);

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
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const _state = __webpack_require__(0)._state;
const CellCommon = __webpack_require__(1);
const CellHandlers = __webpack_require__(13);

function cellMousedown (cell) {

    CellCommon.newSelectedCell(cell);
    _state.mousedown = true;
    return;
}

function cellMouseover (cell) {

    if (_state.mousedown) {
        CellHandlers.handleDrag(cell);
    }
    return;
}

function cellInput (cell) {

    if (_state.funcCellOutput[cell.id]) {
        CellHandlers.handleFuncCellOutput(cell);
    }
    if (_state.funcCellInput[cell.id]) {
        CellHandlers.handleFuncCellInput(cell);
    }
    return;
}

module.exports = {
    cellMousedown,
    cellMouseover,
    cellInput
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const _state = __webpack_require__(0)._state;

function DraggableDiv() {

    this.div = document.createElement('div');
    this.div.style.position = 'absolute';
    this.div.style['pointerEvents'] = 'none';
    this.div.style.background = 'transparent';
    this.div.style.border = '2px solid green';
    this.div.style['boxSizing'] = 'border-box';
    hideDraggableDiv(this.div);
    _state.draggableDiv = this.div;

    return this.div;
}

function hideDraggableDiv (div) {

    div = div || _state.draggableDiv;
    div.style.visibility = 'hidden';
}

module.exports = {
    DraggableDiv,
    hideDraggableDiv
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const LoggerObject = __webpack_require__(10);
const ToolbarElement = __webpack_require__(11);
const CellElement = __webpack_require__(5);
const _state = __webpack_require__(0)._state;
const DraggableDiv = __webpack_require__(7).DraggableDiv;

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
__webpack_require__(16);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function LoggerObject () {

    this.logs = [];

    this.log = (object) => {

        const obj = {};

        obj.time = Date.now();
        obj.state = Object.assign({}, _state)
        Object.keys(object).forEach((key)=> {

            obj[key] = object[key];
        });

        this.logs.push(Object.assign({}, obj));
    }

    this.getLog = () => console.log(this.logs);

    return this;
}

module.exports = LoggerObject;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Styles = __webpack_require__(12);
const ToolbarListeners = __webpack_require__(4);

function Toolbar () {

    this.toolbar = document.createElement('div');
    this.toolbar.setAttribute('id', 'toolbar-div');
    Styles.styleToolbar(this.toolbar);

    internals.addButtons(this.toolbar);

    return this.toolbar;
}

function ToolbarBuffer () {

    this.div = document.createElement('div');
    this.div.style.height = document.getElementById('toolbar-div').style.height;

    return this.div;
}

function EraseButton() {

    this.button = document.createElement('button');
    this.button.innerText = 'Delete';
    Styles.commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => ToolbarListeners.eraseButton_Click());

    return this.button;
}

function DropdownButton(atts) {

    this.button = document.createElement('button');
    this.button.innerText = atts.text;
    Styles.commonButtonStyle(this.button);
    this.button.style[atts.key] = 'red';

    return this.button;
}


function CssButton(atts) {

    this.button = document.createElement('button');
    this.button.innerText = atts.text;
    this.button.style[atts.key] = atts.value;
    Styles.commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => ToolbarListeners.cssButton_Click(atts));

    return this.button;
}

function CutCopyButton (type) {

    this.button = document.createElement('button');
    this.button.innerText = type;
    Styles.commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => ToolbarListeners.cutCopyButton_Click(type));

    return this.button;
}

function PasteButton () {

    this.button = document.createElement('button');
    this.button.innerText = 'paste';
    Styles.commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => ToolbarListeners.pasteButton_Click());

    return this.button;
}

function SumButton () {

    this.button = document.createElement('button');
    this.button.innerText = 'sum';
    Styles.commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => ToolbarListeners.sumButton_Click());

    return this.button;
}

const internals = {};

internals.addButtons = function (toolbar) {

    const buttonAttributes = [
        {
            key: 'fontWeight',
            value: 'bold',
            text: 'B'
        },
        {
            key: 'fontStyle',
            value: 'italic',
            text: 'I'
        },
        {
            key: 'textDecoration',
            value: 'underline',
            text: 'U'
        },
        {
            key: 'textAlign',
            value: 'left',
            text: '='
        },
        {
            key: 'textAlign',
            value: 'center',
            text: '='
        },
        {
            key: 'textAlign',
            value: 'right',
            text: '='
        }
    ];

    // add basic styling buttons
    buttonAttributes.forEach((atts) => toolbar.appendChild(new CssButton(atts)));

    const dropdownButtonAttributes = [
        {
            key: 'color',
            text: 'A'
        },
        {
            key: 'background',
            text: 'A'
        }
    ];

    // add dropdown styling buttons
    // dropdownButtonAttributes.forEach((atts) => toolbar.appendChild(new DropdownButton(atts)));

    toolbar.appendChild(new EraseButton());

    toolbar.appendChild(new CutCopyButton('cut'));
    toolbar.appendChild(new CutCopyButton('copy'));
    toolbar.appendChild(new PasteButton());
    toolbar.appendChild(new SumButton());
}

module.exports = {
    Toolbar,
    ToolbarBuffer,
    EraseButton,
    DropdownButton,
    CssButton,
    CutCopyButton,
    PasteButton,
    SumButton
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function styleToolbar(toolbar) {

    const style = toolbar.style;

    style.background = 'white';
    style.height = '100px';
    style.border = '1px solid black';
    style.position = 'fixed';
    style.width = '100%';
    style['zIndex'] = '999';
    style['minWidth'] = '500px';

}

function commonButtonStyle(button) {

    button.style.width = '70px';
    button.style.height = '35px';
}

module.exports = {
    styleToolbar,
    commonButtonStyle
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const _state = __webpack_require__(0)._state;
const Styles = __webpack_require__(3);
const CellCommon = __webpack_require__(1);

const handleDrag = (cell) => {

    const draggableDiv = _state.draggableDiv;
    const start = _state.startCellRect;
    Styles.inputStyle(start.input);

    const endBounding = CellCommon.getCellBounding(cell);
    const startBounding = CellCommon.getCellBounding(start);
    _state.endCellRect = cell;

    const left = Math.min(startBounding.x, endBounding.x);
    const top = Math.min(startBounding.y, endBounding.y);

    const maxWidth = Math.max(startBounding.x + startBounding.width, endBounding.x + endBounding.width);
    const maxHeight = Math.max(startBounding.y + startBounding.height, endBounding.y + endBounding.height);

    const width = maxWidth - left;
    const height = maxHeight - top;

    draggableDiv.style.left = left + 'px';
    draggableDiv.style.top = top + 'px';
    draggableDiv.style.width = width + 'px';
    draggableDiv.style.height = height + 'px';


    const leftCol = Math.min(start.column, cell.column);
    const rightCol = Math.max(start.column, cell.column);
    const topRow = Math.min(start.row, cell.row);
    const botRow = Math.max(start.row, cell.row);

    _state.allCells.forEach((cell) => {

        if (cell.copied) { return };

        if (CellCommon.isSameCell(cell, start)) {
            cell.input.style.background = 'white';
        }
        else if(topRow <= cell.row &&
            leftCol <= cell.column &&
            botRow >= cell.row &&
            rightCol >= cell.column)
        {
            CellCommon.addToActiveCells(cell);
            cell.input.style.background = 'lightgray';
        } else if (cell.active) {
            CellCommon.removeFromActiveCells(cell);
            cell.input.style.background = 'white';
        }
    });
    return;
}

const handleFuncCellInput = (cell) => {

    _state.funcCellInput[cell.id].forEach((inputCell) => {

        const cellToUpdate = _state.allCells.find((c) => c.id === inputCell);
        cellToUpdate.input.value = _state.funcCellOutput[inputCell].reduce((a, b) => {

            const cellToSum = _state.allCells.find((_c) => _c.id === b);
            if (isNaN(+cellToSum.input.value)) {
                return a;
            }
            return a += +cellToSum.input.value;
        }, 0)
    })
}

const handleFuncCellOutput = (cell) => {

    delete _state.funcCellOutput[cell.id];
    Object.keys(_state.funcCellInput).forEach((each) => {

        if (_state.funcCellInput[each].includes(cell.id)) {
            delete _state.funcCellInput[each];
        }
    })
    return;
}

module.exports = {
    handleDrag,
    handleFuncCellInput,
    handleFuncCellOutput
}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const _state = __webpack_require__(0)._state;
const CellCommon = __webpack_require__(1);
const CellListeners = __webpack_require__(6);
const ToolbarCommon = __webpack_require__(15);

function handlePaste () {

    // sort copied cells, find top-right from active cells
    _state.cutCopy.cells = CellCommon.sortCellsByPosition(_state.cutCopy.cells);
    const startCell = CellCommon.sortCellsByPosition(_state.activeCells)[0];
    const cols = ToolbarCommon.getColumnCount(_state.cutCopy.cells)

    // reset active cells to empty, find first cell to being copying to from allCells array and its index in the array
    _state.activeCells = [];
    const ac = _state.allCells.find((ac) => ac.id === startCell.id)
    const index = _state.allCells.indexOf(ac);

    // push cell from allCells to activeCells array, accounting for new rows
    let columnsAdded = 0;
    for (let i = index; _state.activeCells.length < _state.cutCopy.cells.length; ++i) {

        if (columnsAdded === cols) {
            i = i - cols + COL_COUNT - 1;
            columnsAdded = 0;
            if (i > _state.allCells.length) {
                break;
            }
            continue;
        }

        const newCell = _state.allCells[i];
        _state.activeCells.push(newCell);
        ++columnsAdded
    }

    // Loop through these active cells and copy value from copied array
    _state.activeCells.forEach((cell, index) => {

        cell.input.value = _state.cutCopy.cells[index].input.value;
        CellListeners.cellInput(cell);
        if (_state.cutCopy.type === 'cut') {
            handleCut(_state.activeCells, _state.cutCopy.cells[index]);
        }
    });
}

function handleCut (pastedCells, cutCell) {

    const found = pastedCells.find((p) => CellCommon.isSameCell(p, cutCell));
    if (!found) {
        const originalCutCell = _state.allCells.find((c) => CellCommon.isSameCell(c, cutCell));
        CellCommon.clearCell(originalCutCell);
    } 
}

module.exports = {
    handlePaste
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getColumnCount (cells) {

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
}

module.exports = {
    getColumnCount
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const _state = __webpack_require__(0)._state;
const CellListeners = __webpack_require__(6);
const ToolbarListeners = __webpack_require__(4);
const CellCommon = __webpack_require__(1);
const DraggableDiv = __webpack_require__(7);
const Common = __webpack_require__(2);

// common code
const getCell = (e) => {

    const input = e.target.id;
    if (!input) return;
    const cell = _state.allCells.find((c) => c.id === input.slice(5)); // input id are prefaced with 'cell-' to slice first 5 char
    if (!cell) return;
    return cell;
}

window.addEventListener('mouseup', (e) => window_Mouseup());
window.addEventListener('keydown', (e) => window_Keydown(e));
window.addEventListener('keyup', (e) => window_Keyup(e));
window.addEventListener('mousemove', (e) => window_Mousemove(e));
window.addEventListener('input', (e) => window_Input(e));
window.addEventListener('mousedown', (e) => window_Mousedown(e));
window.addEventListener('mouseover', (e) => window_Mouseover(e));

const window_Input = (e) => {

    const cell = getCell(e);
    return cell ? CellListeners.cellInput(cell) : '';
}

const window_Mousedown = (e) => {

    const cell = getCell(e);
    return cell ? CellListeners.cellMousedown(cell) : '';
}

const window_Mouseover = (e) => {

    const cell = getCell(e);
    return cell ? CellListeners.cellMouseover(cell) : '';   
}

const window_Mousemove = (e) => {

    if (_state.colDrag) {
        handleResizeRowColumn(e, 'column');
    }
    else if (_state.rowDrag) {
        handleResizeRowColumn(e, 'row');
    }
};

const window_Mouseup = () => {

    _state.mousedown = false;
    _state.colDrag = false;
    _state.rowDrag = false;
}

const window_Keydown = (e) => {

    if (e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown') {
        return handleNavigateCells(e);
    }

    if (e.key === 'Meta') {
        return _state.commandActive = true;
    }

    if (_state.commandActive) {
        return handleCommandActiveKeydown(e);
    }
}

const window_Keyup = (e) => {

    if (e.key === 'Meta') {
        _state.commandActive = false;
    } 
}

const handleCommandActiveKeydown = (e) => {

    if (e.key === 'c') {
        ToolbarListeners.cutCopyButton_Click('copy');
        return;
    }
    else if (e.key === 'x') {
        ToolbarListeners.cutCopyButton_Click('cut');
        return;
    }
    else if (e.key === 'v') {
        e.preventDefault();
        ToolbarListeners.pasteButton_Click();
        return;
    }
    return;
}


const handleResizeRowColumn = (e, type) => {

    DraggableDiv.hideDraggableDiv();
    CellCommon.deactivateAllCells();

    let marker;
    let mousePosition;
    let headerArray;
    let prop;
    let heightOffset;
    if (type === 'row') {
        marker = _state.rowDrag;
        mousePosition = e.clientY;
        headerArray = _state.rowHeaders;
        prop = 'height';
        heightOffset = 100 + CELL_HEIGHT;
    }
    else if (type === 'column') {
        marker = _state.colDrag;
        mousePosition = e.clientX;
        headerArray = _state.columnHeaders;
        prop = 'width';
        heightOffset = 0;
    }
    else {
        console.error('ERROR handleResizeRowColumn, type = ', type);
    }


    const i = headerArray.indexOf(marker);
    const headerToMove = headerArray[i - 1];

    const position = headerArray.slice(0, i).reduce((a, b) => a += Common.translatePxToNum(b.div.style[prop]), heightOffset)
    const movement = mousePosition - position;

    if (type === 'column' && Common.translatePxToNum(headerToMove.div.style[prop]) <= 50 && movement < 0) return;
    if (type === 'row' && Common.translatePxToNum(headerToMove.div.style[prop]) <= 25 && movement < 0) return;

    Common.updateHeightWidth(headerToMove.div, movement, prop);
    Common.updateHeightWidth(document.getElementById('spreadsheet-div'), movement, prop)

    const cells = _state.allCells.filter((c) => c[type] === marker[type] - 1);
    cells.forEach((c) => Common.updateHeightWidth(c.div, movement, prop))
    return;
}

const handleNavigateCells = (e) => {

    const activeElement = _state.allCells.find((cell) => 'cell-' + cell.id === document.activeElement.id);
    if (!activeElement) { return };
    let row = activeElement.row;
    let column = activeElement.column;

    switch (e.key) {
        case "ArrowLeft":
            column = column > 0 ? --column : 0
            break;
        case "ArrowRight":
            column = column < COL_COUNT - 1 ? ++column : 0
            break;
        case "ArrowUp":
            row = row > 0 ? --row : 0
            break;
        case "ArrowDown":
            row = row < ROW_COUNT - 1 ? ++row : 0
            break;
    }

    const newElement = _state.allCells.find((cell) => cell.row === row && cell.column === column);
    CellCommon.newSelectedCell(newElement);
    newElement.input.focus();
}


/***/ })
/******/ ]);