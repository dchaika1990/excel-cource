// import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resize} from '@/components/table/sizeChange';


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
        resize(event, this);
    }
}
