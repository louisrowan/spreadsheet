'use strict';

function Toolbar () {

    this.toolbar = document.createElement('div');
    styleToolbar(this.toolbar);

    addButtons(this.toolbar);

    return this.toolbar;
}



function styleToolbar(toolbar) {

    const style = toolbar.style;

    style.height = '100px';
    style.border = '1px solid black';

}


function addButtons(toolbar) {

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

    toolbar.appendChild(new CopyButton());
    toolbar.appendChild(new PasteButton());
}

function EraseButton() {

    this.button = document.createElement('button');
    this.button.innerText = 'Delete';
    commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => {

        _state.activeCells.forEach((cell) => cell.input.value = '');
    });

    return this.button;
}

function DropdownButton(atts) {

    this.button = document.createElement('button');
    this.button.innerText = atts.text;
    commonButtonStyle(this.button);
    this.button.style[atts.key] = 'red';

    return this.button;
}


function CssButton(atts) {

    this.button = document.createElement('button');
    this.button.innerText = atts.text;
    this.button.style[atts.key] = atts.value;
    commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => {

        _state.activeCells.forEach((cell) => {

            // toggle property
            let style = cell.input.style;
            style[atts.key] = style[atts.key] === atts.value ? '' : atts.value;
        });
    });

    return this.button;
}


function commonButtonStyle(button) {

    button.style.width = '50px';
    button.style.height = '30px';
}



function CopyButton () {

    this.button = document.createElement('button');
    this.button.innerText = 'copy';
    commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => {

        sortCellsByPosition(_state.activeCells);
        _state.copy = _state.activeCells.map((c) => {

            const copied = copyCell(c);
            copied.row = c.row;
            copied.column = c.column
            return copied;
        });

    })

    return this.button;
}

function PasteButton () {

    this.button = document.createElement('button');
    this.button.innerText = 'paste';
    commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => {

        // sort copied cells, find top-right from active cells
        _state.copy = sortCellsByPosition(_state.copy);
        const startCell = sortCellsByPosition(_state.activeCells)[0];

        // determine # of columns that copied cell rectangle contains
        let cols = 0;
        for (let i = 0; i < _state.copy.length; ++i) {
            const currentCell = _state.copy[i];
            if (currentCell.row != _state.copy[0].row) {
                break;
            }
            ++cols;
        }

        // reset active cells to empty, find first cell to being copying to from allCells array and its index in the array
        _state.activeCells = [];
        const ac = _state.allCells.find((ac) => ac.id === startCell.id)
        const index = _state.allCells.indexOf(ac);

        // push cell from allCells to activeCells array, accounting for new rows
        let columnsAdded = 0
        for (let i = index; _state.activeCells.length < _state.copy.length; ++i) {

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

            cell.input.value = _state.copy[index].input.value;
        });
    });

    return this.button;
}

