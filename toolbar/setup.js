'use strict';

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
