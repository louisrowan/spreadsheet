'use strict';

function Cell (row, column) {

    // set props
    this.div = document.createElement('div');
    this.input = document.createElement('input');
    this.div.appendChild(this.input);
    this.id = Math.random().toString()
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

        deactivateAllCells();
        addToActiveCells(this);

        const draggableDiv = _state.draggableDiv;
        const startCellRect = this.div.getBoundingClientRect();
        _state.startCellRect = startCellRect;

        draggableDiv.style.left = startCellRect.x + 'px';
        draggableDiv.style.top = startCellRect.y + 'px';

    })

    this.input.addEventListener('mousedown', (e) => {

        this.input.style.outline = '1px solid blue';
        _state.mousedown = true;
    })

    this.input.addEventListener('mouseover', (e) => {

        console.log('mouse over');

        if (_state.mousedown) {
            handleDrag(this)
            this.input.style.outline = '1px solid blue';
        }
    })



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
    const end = cell.div.getBoundingClientRect();
    const start = _state.startCellRect;
    _state.endCellRect = end;

    console.log('recalculate');

    const left = Math.min(start.x, end.x);
    const top = Math.min(start.y, end.y);

    const maxWidth = Math.max(start.x + start.width, end.x + end.width);
    const maxHeight = Math.max(start.y + start.height, end.y + end.height);

    const width = maxWidth - left;
    const height = maxHeight - top;


    draggableDiv.style.left = left + 'px';
    draggableDiv.style.top = top + 'px';
    draggableDiv.style.width = width + 'px';
    draggableDiv.style.height = height + 'px';


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
        cell.input.style.border = '2px solid green';
    }
}


function removeFromActiveCells(cell) {

    const index = _state.activeCells.indexOf(cell);
    if (index > -1) {
        _state.activeCells.splice(index, 1);
        cell.input.style.border = '1px solid rgb(238, 238, 238)';
    }
}


function deactivateAllCells() {

    _state.allCells.forEach((cell) => removeFromActiveCells(cell));
}