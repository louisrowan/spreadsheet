'use strict';

function updateHeightWidth (element, diff, prop) {

    const original = translatePxToNum(element.style[prop]);
    const updated = `${+original + +diff}px`;
    element.style[prop] = updated;
    console.log(original, updated);
    return;
}

function translatePxToNum (px) {

    return +(px.slice(0, -2));
}