'use strict';

window.addEventListener('mouseup', (e) => {

    const inputs = document.getElementsByTagName('input');
    console.log(inputs);
    console.log(typeof inputs);

    Object.keys(inputs).forEach((i) => {

        inputs[i].style.outline = 'none';
    })
    window.mousedown = false;
})