'use strict';

function cellStyle(div) {

    const style = div.style;
    
    style.width = CELL_WIDTH + 'px';
    style.height = CELL_HEIGHT + 'px';
    style.float = 'left';
    return;
}

function inputStyle(input) {

    const style = input.style;
    
    style.width = '100%';
    style.height = '100%';
    style.outline = 'none';
    style.border = '1px solid rgb(238, 238, 238)';
    style['boxSizing'] = 'border-box';
    style.cursor = 'cell';
    style['fontWeight'] = 'normal';
    style['fontStyle'] = 'normal';
    style['textDecoration'] = 'none';
    style['textAlign'] = 'left';
    return;
}

function headerCellStyle (div) {

    const style = div.style;

    style.border = '1px solid rgb(238, 238, 238)';
    style['boxSizing'] = 'border-box';
    style.background = 'whitesmoke';
    return;
}
