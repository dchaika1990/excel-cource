// import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resize} from '@/components/table/sizeChange';
import {shouldResize} from '@/components/table/shouldResize';


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
        if (shouldResize(event)) {
            resize(event, this.$root);
        }
    }
}
