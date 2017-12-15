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

    buttonAttributes.forEach((atts) => toolbar.appendChild(new CssButton(atts)));

}


function CssButton(atts) {

    this.button = document.createElement('button');
    this.button.innerText = atts.text;
    this.button.style[atts.key] = atts.value;
    this.button.style.width = '50px';
    this.button.style.height = '30px';

    this.button.addEventListener('click', (e) => {

        _state.activeCells.forEach((cell) => {

            // toggle property
            let style = cell.input.style;
            style[atts.key] = style[atts.key] === atts.value ? '' : atts.value;
        })
    })

    return this.button;

}