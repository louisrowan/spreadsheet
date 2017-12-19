'use strict';

function Toolbar () {

    this.toolbar = document.createElement('div');
    styleToolbar(this.toolbar);

    addButtons(this.toolbar);

    return this.toolbar;
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

function CutCopyButton (type) {

    this.button = document.createElement('button');
    this.button.innerText = type;
    commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => {

        sortCellsByPosition(_state.activeCells);
        _state.cutCopy.type = type;
        _state.cutCopy.cells = _state.activeCells.map((c) => {

            const copied = copyCell(c);
            copied.row = c.row;
            copied.column = c.column
            return copied;
        });
    });

    return this.button;
}

function PasteButton () {

    this.button = document.createElement('button');
    this.button.innerText = 'paste';
    commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => {

        handlePaste();
    });

    return this.button;
}
