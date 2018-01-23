'use strict';

const { CELL_HEIGHT, CELL_WIDTH, COL_COUNT, ROW_COUNT } = require('../constants');


exports.cellStyle = (div) => {

    const style = div.style;
    
    style.width = CELL_WIDTH + 'px';
    style.height = CELL_HEIGHT + 'px';
    style.float = 'left';
    return;
};


exports.inputStyle = (input) => {

    const style = input.style;
    
    style.width = '100%';
    style.height = '100%';
    style.outline = 'none';
    style.border = '1px solid rgb(238, 238, 238)';
    style.cursor = 'cell';
    style['boxSizing'] = 'border-box';
    style['fontWeight'] = 'normal';
    style['fontStyle'] = 'normal';
    style['textDecoration'] = 'none';
    style['textAlign'] = 'left';
    return;
};


exports.headerCellStyle = (div) => {

    const style = div.style;

    style.border = '1px solid rgb(238, 238, 238)';
    style.background = 'whitesmoke';
    style.position = 'relative';
    style['boxSizing'] = 'border-box';
    return;
};


exports.columnHeaderSpanStyle = (div) => {

    const style = div.style;

    style.width = '2px';
    style.background = 'gray';
    style.position = 'relative';
    style.display = 'inline-block';
    style.right = '2px';
    style.cursor = 'col-resize';
    style['boxSizing'] = 'border-box';
    return;
};


exports.rowHeaderSpanStyle = (span, div) => {

    const style = span.style;

    style.width = div.style.width;
    style.height = '2px';
    style.background = 'gray';
    style.position = 'absolute';
    style.top = '-2px';
    style.cursor = 'row-resize';
    style['boxSizing'] = 'border-box';
    return;
};


exports.columnHeaderTextStyle = (element) => {

    const style = element.style;

    style.width = '100%';
    style.height = '100%';
    style.position = 'absolute';
    style.left = '0px';
    style.right = '0px';
    style.top = '0px';
    style.bottom = '0px';
    style['textAlign'] = 'center';
    style['pointerEvents'] = 'none';
    style['paddingTop'] = (CELL_HEIGHT/3) + 'px';
    return;
};


exports.columnHeaderDivStyle = (element) => {

    const style = element.style;

    style.width = CELL_WIDTH * (COL_COUNT + 1) + 'px';
    style.height = CELL_HEIGHT + 'px';
    style.position = 'fixed';
    style.left = '0px';
    style.top = '100px';

    return;
};


exports.columnHeaderDivBufferStyle = (element) => {

    const style = element.style;

    style.width = '100%'
    style.height = CELL_HEIGHT + 'px';

    return;
};


exports.rowHeaderDivStyle = (element) => {

    const style = element.style;

    style.height = ROW_COUNT * CELL_HEIGHT + 'px';
    style.width = CELL_WIDTH + 'px';
    style.position = 'fixed';
    style.top = '140px';

    return;
}


exports.rowHeaderDivBufferStyle = (element) => {

    const style = element.style;

    style.width = CELL_WIDTH + 'px';
    style.height = ROW_COUNT * CELL_HEIGHT + 'px';
    style.width = CELL_WIDTH + 'px';
    style.float = 'left';

    return;
}
