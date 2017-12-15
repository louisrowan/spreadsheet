'use strict';

window.addEventListener('mouseup', (e) => {

    const inputs = document.getElementsByTagName('input');

    Object.keys(inputs).forEach((i) => {

        inputs[i].style.outline = 'none';
    })
    _state.mousedown = false;
})