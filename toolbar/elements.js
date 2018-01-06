'use strict';

const Styles = require('./styles');
const ToolbarListeners = require('./eventListeners');

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
