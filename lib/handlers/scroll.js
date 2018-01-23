'use strict';

module.exports = () => {

    const col = document.getElementById('column-header-div');
    col.style.left = -window.scrollX + 'px';

    const row = document.getElementById('row-header-div');
    row.style.top = -window.scrollY + 140 + 'px';

    return;
};
