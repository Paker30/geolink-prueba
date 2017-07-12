import { Component, OnInit } from '@angular/core';
import { GeoBlinkHTTPService } from '../services/http.service';
import { ChartService } from '../services/chart.service';
import * as d3 from 'd3';

@Component({
    selector: 'geoblink-grafico',
    template: require('./grafico.html'), host: {style: 'width: 100%'},
    styles: [require('./grafico.css')]
})
export class GraficoComponent implements OnInit {
    private data;

    constructor(private chart: ChartService, private http: GeoBlinkHTTPService) {
    }

    ngOnInit() {
        this.http.get('map')
            .map(data => this.data = data)
            .subscribe(() => {
                let w = 300,
                    h = 300;
                let colorscale = d3.scaleOrdinal().range(['#d72526','#eb8000','#1696a3']);

                // legend titles
                let LegendOptions = ['Reference area','area 1', 'area 2'];
                let mycfg = {
                    w: w,
                    h: h,
                    maxValue: 0.6,
                    levels: 6,
                    ExtraWidthX: 300
                };
                let d = [];

                for(var i = 0; i<this.data.length; i++) {
                    var aux = [];
                    for(var j in this.data[i].variables.indexes) {
                        aux.push({axis: j, value: Number(this.data[i].variables.indexes[j])});
                    }
                    d.push(aux);
                }

                this.chart.draw('#chart', d, mycfg);

                let svg = d3.select('svg')
                            .append('svg')
                            .attr('width', w+300)
                            .attr('height', h);
                // initiate Legend
                var legend = svg.append('g')
                    .attr('class', 'legend')
                    .attr('height', 100)
                    .attr('width', 200)
                    .attr('transform', 'translate(90,20)')
                    ;
                // create colour squares
                legend.selectAll('rect')
                    .data(LegendOptions)
                    .enter()
                    .append('rect')
                    .attr('x', w - 65)
                    .attr('y', (d, i) => { return i * 20;})
                    .attr('width', 10)
                    .attr('height', 10)
                    .style('fill', (d, i) => { return colorscale(i);});
                // create text next to squares
                legend.selectAll('text')
                    .data(LegendOptions)
                    .enter()
                    .append('text')
                    .attr('x', w - 52)
                    .attr('y', (d, i) => { return i * 20 + 9;})
                    .attr('font-size', '11px')
                    .attr('fill', '#737373')
                    .text(d => d);
            });
    }
}
