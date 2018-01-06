'use strict';

function updateHeightWidth (element, diff, prop) {

    const original = translatePxToNum(element.style[prop]);
    const updated = `${+original + +diff}px`;
    element.style[prop] = updated;
    return;
}

function translatePxToNum (px) {

    return +(px.slice(0, -2));
}

const validate = (args, funcName) => {

    if (typeof args !== 'object') {
        console.warn('invalid args given from', funcName, args)
    }

    Object.keys(args).forEach((k) => {

        const type = typeof args[k];
        if (type !== typeof k) {
            console.warn('invalid args given from', funcName, args);
        }
    })
    return;
}

module.exports = {
    updateHeightWidth,
    translatePxToNum,
    validate
}
