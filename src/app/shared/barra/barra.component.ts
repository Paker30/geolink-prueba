import { Component, OnInit } from '@angular/core';
import { GeoBlinkHTTPService } from '../services/http.service';

@Component({
    selector: 'barra',
    template: require('./barra.html'), host: {style: 'width: 100%'},
    styles: [require('./barra.css')]
})
export class BarraComponent implements OnInit {
    calles;
    constructor(private http: GeoBlinkHTTPService) { }

    ngOnInit() {
        this.http.get('calles')
            .subscribe(calles => this.calles = calles);
    }
}
