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
            const index = [...$parent.$el.parentElement.children]
                .indexOf($parent.$el);
            const $rowsCells = [].slice.call(document.querySelectorAll('.row'))
                .slice(1);
            const cellsIndex = $rowsCells.map(row => {
                return row.querySelectorAll('.cell')[index];
            });
            const cellsInfo = [].slice.call($parent.$el.parentElement
                .querySelectorAll('.cell'));
            if ( type === 'col' ) {
                cellsIndex.forEach(el => el.style.borderRightColor = '#3c74ff');
            } else {
                cellsInfo.forEach(el => el.style.borderBottomColor = '#3c74ff');
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
                cellsIndex.forEach(el => el.style.borderRightColor = '#e2e3e3');
                cellsInfo.forEach(el => el.style.borderBottomColor = '#e2e3e3');
                document.onmousemove = null;
            };
        }
    }
}
