'use strict';

const getNewHeightWidth = (element, diff, property) => {

    const original = translatePxToNum(element.style[property]);
    return { [property]: `${+original + +diff}px` };
};


const translatePxToNum = (px) => {

    return +(px.slice(0, -2));
};


const validate = (args, funcName) => {

    if (typeof args !== 'object') {
        console.warn('invalid args given from', funcName, args);
    }

    Object.keys(args).forEach((k) => {

        const type = typeof args[k];
        if (type !== typeof k) {
            console.warn('invalid args given from', funcName, args);
        }
    });
    return;
};


module.exports = {
    getNewHeightWidth,
    translatePxToNum,
    validate
};
