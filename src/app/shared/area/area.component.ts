import { Component, Input } from '@angular/core';

@Component({
    selector: 'barra-area',
    template: require('./area.html'),
    styles: [require('./area.css')]
})
export class AreaComponent {
    @Input() title: string;
    @Input() population: number;
    @Input() address: string;
    @Input() pos: number;
}
