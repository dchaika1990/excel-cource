import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(18);
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target);
            const $parent = $resizer.closest('[data-type="resizable"]');
            const coords = $parent.getCoords();
            const type = event.target.dataset.resize;
            const colIndex = $parent.$el.textContent.trim();
            const cellsIndex = [].slice.call(document
                .querySelectorAll(`[data-cell="${colIndex}"]`));
            const cellsInfo = [].slice.call($parent.$el
                .closest('[data-row="parent-row"]')
                .querySelectorAll('.cell'));
            console.log(type);
            if ( type === 'col' ) {
                cellsIndex.forEach(el => toggleClass(el, 'active-col'));
            } else if ( type ==='row' ) {
                cellsInfo.forEach(el => toggleClass(el, 'active-cell'));
            }

            document.onmousemove = e => {
                if ( type === 'col' ) {
                    const delta = e.pageX - coords.right;
                    const value = coords.width + delta;
                    $parent.$el.style.width = value + 'px';
                    cellsIndex.forEach(cell => {
                        cell.style.width = value + 'px';
                    });
                } else {
                    const delta = e.pageY - coords.bottom;
                    const value = coords.height + delta;
                    $parent.$el.style.height = value + 'px';
                }
            };

            document.onmouseup = () => {
                cellsIndex.forEach(el => toggleClass(el, 'active-col'));
                cellsInfo.forEach(el => toggleClass(el, 'active-cell'));
                document.onmousemove = null;
            };
        }
    }
}


function toggleClass(el, className) {
    return el.classList.toggle(className);
}
