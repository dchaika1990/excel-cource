import {$} from '@core/dom';

export const resize = (event, self) => {
    if (event.target.dataset.resize) {
        const $resizer = $(event.target);
        const $parent = $resizer.closest('[data-type="resizable"]');
        const coords = $parent.getCoords();
        const type = $resizer.data.resize;
        const sideProp = type === 'col' ? 'right' : 'bottom';
        let value;
        $resizer.classList.add('active');

        const cells = self.$root
            .findAll(`[data-col='${$parent.data.col}']`);

        document.onmousemove = e => {
            if ( type === 'col' ) {
                const delta = e.pageX - coords.right;
                value = coords.width + delta;
                $resizer.css({right: -delta + 'px'});
            } else {
                const delta = e.pageY - coords.bottom;
                value = coords.height + delta;
                $resizer.css({bottom: -delta + 'px'});
            }
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            if ( type === 'col' ) {
                $parent.css({width: value + 'px'});
                cells.forEach(el => el.style.width = value + 'px');
            } else {
                $parent.css({height: value + 'px'});
            }
            $resizer.classList.remove('active');
            $resizer.css({[sideProp]: 0});
        };
    }
};
