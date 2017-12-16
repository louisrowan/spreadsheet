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
    ]

    // add dropdown styling buttons
    // dropdownButtonAttributes.forEach((atts) => toolbar.appendChild(new DropdownButton(atts)));

    toolbar.appendChild(new EraseButton());
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
    this.button.innerText = atts.text
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
        })
    })

    return this.button;
}


function commonButtonStyle(button) {

    button.style.width = '50px';
    button.style.height = '30px';
}