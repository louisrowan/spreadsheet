'use strict';

const ToolbarElement = require('../lib/toolbar/elements');
const CellElement = require('../lib/cell/elements');
const { _state  } = require('../lib/state');
const DraggableDiv = require('../lib/draggableDiv').DraggableDiv;

exports.Setup = (col = 10, row = 10) => {

    internals.resetState();
    const main = document.getElementById('main');
    // const body = document.body;

    const _toolbar = new ToolbarElement.Toolbar();
    main.appendChild(_toolbar);
    main.appendChild(new ToolbarElement.ToolbarBuffer());

    const _spreadsheetContainer = new CellElement.SpreadsheetContainer();
    main.appendChild(_spreadsheetContainer);
    _state.spreadsheetContainer = _spreadsheetContainer;

    for (let i = -1; i < col; ++i) {

        const _header = new CellElement.ColumnHeader(i);
        _spreadsheetContainer.appendChild(_header.div);
        _state.columnHeaders.push(_header);
    }

    for (let i = 0; i < row; ++i) {

        const _row = new CellElement.RowHeader(i);
        _spreadsheetContainer.appendChild(_row.div);
        _state.rowHeaders.push(_row);

        for (let j = 0; j < col; ++j) {

            const _cell = new CellElement.Cell(i, j);
            _spreadsheetContainer.appendChild(_cell.div);
            _state.allCells[_cell.id] = _cell;
        }
    }

    main.appendChild(new DraggableDiv());
    return _state;
};


const internals = {};

internals.resetState = () => {

    _state.allCells = {};
    _state.activeCells = [];
    _state.mousedown = false;
    _state.colDrag = false;
    _state.rowDrag = false;
    _state.cellDrag = false;
    _state.draggableDiv = {};
    _state.spreadsheetContainer = {};
    _state.startCellRect = {};
    _state.endCellRect = {};
    _state.cutCopyType = '';
    _state.cutCopyCells = [];
    _state.commandActive = false;
    _state.shiftActive = false;
    _state.columnHeaders = [];
    _state.rowHeaders = [];
    _state.funcCellOutput = {};
    _state.funcCellInput = {};
    return;
};
