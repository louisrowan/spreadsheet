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
    style.cursor = 'cell';
    style['boxSizing'] = 'border-box';
    style['fontWeight'] = 'normal';
    style['fontStyle'] = 'normal';
    style['textDecoration'] = 'none';
    style['textAlign'] = 'left';
    return;
}

function headerCellStyle (div) {

    const style = div.style;

    style.border = '1px solid rgb(238, 238, 238)';
    style.background = 'whitesmoke';
    style.position = 'relative';
    style['boxSizing'] = 'border-box';
    return;
}

function columnHeaderSpanStyle (div) {

    const style = div.style;

    style.width = '2px';
    style.background = 'black';
    style.position = 'relative';
    style.display = 'inline-block';
    style.right = '2px';
    style.cursor = 'col-resize';
    style['boxSizing'] = 'border-box';
    return;
}

function rowHeaderSpanStyle (span, div) {

    const style = span.style;

    style.width = div.style.width;
    style.height = '2px';
    style.background = 'black';
    style.position = 'absolute';
    style.top = '-2px';
    style.cursor = 'row-resize';
    style['boxSizing'] = 'border-box';
    return;
}

function columnHeaderTextStyle (element, height) {

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
}
