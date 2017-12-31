'use strict';

function Toolbar () {

    this.toolbar = document.createElement('div');
    styleToolbar(this.toolbar);

    addButtons(this.toolbar);

    return this.toolbar;
}

function ToolbarBuffer () {

    this.div = document.createElement('div');
    this.div.style.height = _toolbar.style.height;

    return this.div;
}

function EraseButton() {

    this.button = document.createElement('button');
    this.button.innerText = 'Delete';
    commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => eraseButton_Click());

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

    this.button.addEventListener('click', (e) => cssButton_Click(atts));

    return this.button;
}

function CutCopyButton (type) {

    this.button = document.createElement('button');
    this.button.innerText = type;
    commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => cutCopyButton_Click(type));

    return this.button;
}

function PasteButton () {

    this.button = document.createElement('button');
    this.button.innerText = 'paste';
    commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => pasteButton_Click());

    return this.button;
}

function SumButton () {

    this.button = document.createElement('button');
    this.button.innerText = 'sum';
    commonButtonStyle(this.button);

    this.button.addEventListener('click', (e) => sumButton_Click());

    return this.button;
}
