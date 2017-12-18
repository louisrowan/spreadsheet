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

        const startCell = sortCellsByPosition(_state.activeCells)[0];

        let cols = 0;
        for (let i = 0; i < _state.copy.length; ++i) {
            const currentCell = _state.copy[i];
            if (currentCell.row != _state.copy[0].row) {
                break;
            }
            ++cols;
        }

        _state.activeCells = [startCell];


        const ac = _state.allCells.find((ac) => ac.id === startCell.id)
        const index = _state.allCells.indexOf(ac);

        let columnsAdded = 0
        for (let i = index + 1; _state.activeCells.length < _state.copy.length; ++i) {

            console.log('col add, cols', columnsAdded, cols);

            if (columnsAdded === cols) {
                i = i - cols + COL_COUNT - 1;
                columnsAdded = 0;
                if (i > _state.allCells.length) {
                    console.log('GONNA BREAK NOW');
                    break;
                }
                console.log('now i = ', i);
                continue;
            }

            const newCell = _state.allCells[i];
            _state.activeCells.push(newCell);
            console.log('pushed a new cell');
            ++columnsAdded
        }

        _state.activeCells.forEach((cell, index) => {

            // console.log(cell);

            cell.input.value = _state.copy[index].input.value;
            // console.log(cell.row, cell.column, cell.input.value);
            // console.log(cell.input.value);
        })
        // cell.input.value = _state.copy[0].input.value
    })

    return this.button;
}

