'use strict';

const Styles = require('./styles');

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
    this.button.setAttribute('id', 'deleteButton');
    Styles.commonButtonStyle(this.button);

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
    this.button.setAttribute('id', atts.id);
    this.button.style[atts.key] = atts.value;
    Styles.commonButtonStyle(this.button);

    return this.button;
}


function CutCopyButton (type) {

    this.button = document.createElement('button');
    this.button.innerText = type;
    this.button.setAttribute('id', `${type}Button`);
    Styles.commonButtonStyle(this.button);

    return this.button;
}


function PasteButton () {

    this.button = document.createElement('button');
    this.button.innerText = 'paste';
    this.button.setAttribute('id', 'pasteButton');
    Styles.commonButtonStyle(this.button);

    return this.button;
}


function SumButton () {

    this.button = document.createElement('button');
    this.button.innerText = 'sum';
    this.button.setAttribute('id', 'sumButton');
    Styles.commonButtonStyle(this.button);

    return this.button;
}


const internals = {};

internals.addButtons = function (toolbar) {

    const buttonAttributes = [
        {
            key: 'fontSize',
            value: '11px',
            text: 'A',
            id: 'textSize11Button'
        },
                {
            key: 'fontSize',
            value: '16px',
            text: 'A',
            id: 'textSize16Button'
        },
                {
            key: 'fontSize',
            value: '20px',
            text: 'A',
            id: 'textSize20Button'
        },
        {
            key: 'fontWeight',
            value: 'bold',
            text: 'B',
            id: 'boldButton'
        },
        {
            key: 'fontStyle',
            value: 'italic',
            text: 'I',
            id: 'italicButton'
        },
        {
            key: 'textDecoration',
            value: 'underline',
            text: 'U',
            id: 'underlineButton'
        },
        {
            key: 'textAlign',
            value: 'left',
            text: '=',
            id: 'leftalignButton'
        },
        {
            key: 'textAlign',
            value: 'center',
            text: '=',
            id: 'centeralignButton'
        },
        {
            key: 'textAlign',
            value: 'right',
            text: '=',
            id: 'rightalignButton'
        }
    ];

    // add basic styling buttons
    buttonAttributes.forEach((atts) => toolbar.appendChild(new CssButton(atts)));

    // const dropdownButtonAttributes = [
    //     {
    //         key: 'color',
    //         text: 'A'
    //     },
    //     {
    //         key: 'background',
    //         text: 'A'
    //     }
    // ];

    // add dropdown styling buttons
    // dropdownButtonAttributes.forEach((atts) => toolbar.appendChild(new DropdownButton(atts)));

    toolbar.appendChild(new EraseButton());

    toolbar.appendChild(new CutCopyButton('cut'));
    toolbar.appendChild(new CutCopyButton('copy'));
    toolbar.appendChild(new PasteButton());
    toolbar.appendChild(new SumButton());
};


module.exports = {
    Toolbar,
    ToolbarBuffer,
    EraseButton,
    DropdownButton,
    CssButton,
    CutCopyButton,
    PasteButton,
    SumButton
};
