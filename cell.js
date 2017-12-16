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
    inputStyle(this.input)

    // event listeners
    this.input.addEventListener('input', (e) => {

        this.input.value = e.target.value;
    })

    this.input.addEventListener('click', (e) => {

        newSelectedCell(this);

    })

    this.input.addEventListener('mousedown', (e) => {

        _state.mousedown = true;
    })

    this.input.addEventListener('mouseover', (e) => {

        if (_state.mousedown) {
            handleDrag(this)
        }
    });

    _state.allCells.push(this);
    return this;
}

Cell.prototype.getText = function() {

    return this.input.value;
}

Cell.prototype.setText = function(val) {

    this.input.value = val;
    return this.input.value
}


function handleDrag(cell) {

    const draggableDiv = _state.draggableDiv;
    const end = cell;
    const endBounding = end.div.getBoundingClientRect();
    const start = _state.startCellRect;
    const startBounding = start.div.getBoundingClientRect();
    _state.endCellRect = end;

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


    const leftCol = Math.min(start.column, end.column);
    const rightCol = Math.max(start.column, end.column);
    const topRow = Math.min(start.row, end.row);
    const botRow = Math.max(start.row, end.row);

    _state.allCells.forEach((cell) => {

        if(topRow <= cell.row &&
            leftCol <= cell.column &&
            botRow >= cell.row &&
            rightCol >= cell.column)
        {
            addToActiveCells(cell);
            cell.input.style.background = 'whitesmoke';
        } else {
            removeFromActiveCells(cell);
            cell.input.style.background = 'white';
        }
    });
}

function cellStyle(div) {

    const style = div.style;
    
    style.width = '100px';
    style.height = '50px';
    style.display = 'inline-block';
}

function inputStyle(input) {

    const style = input.style;
    
    style.width = '100%';
    style.height = '100%';
    style.outline = 'none';
    style.border = '1px solid rgb(238, 238, 238)';
    style['boxSizing'] = 'border-box';
    style.cursor = 'cell';
}

function addToActiveCells(cell) {

    if (!_state.activeCells.find((active) => active.id === cell.id)) {
        _state.activeCells.push(cell);
        
    }
}

function removeFromActiveCells(cell) {

    const index = _state.activeCells.indexOf(cell);
    if (index > -1) {
        _state.activeCells.splice(index, 1);
        cell.input.style.border = '1px solid rgb(238, 238, 238)';
        cell.input.style.background = 'white';
    }
}

function deactivateAllCells() {

    _state.allCells.forEach((cell) => removeFromActiveCells(cell));
}

function newSelectedCell(cell) {

    deactivateAllCells();
    addToActiveCells(cell);
    cell.input.style.border = '2px solid green';

    const draggableDiv = _state.draggableDiv;
    const startCellRect = cell;
    _state.startCellRect = startCellRect;
    _state.endCellRect = {};

    const startCellBounding = startCellRect.div.getBoundingClientRect();

    draggableDiv.style.left = startCellBounding.x + 'px';
    draggableDiv.style.top = startCellBounding.y + 'px';
    draggableDiv.style.width = '0px';
    draggableDiv.style.height = '0px';
}
