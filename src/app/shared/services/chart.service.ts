import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable()
export class ChartService {

    draw (id, d, options) {
        var cfg = {
            radius: 5,
            w: 400,
            h: 200,
            factor: 1,
            factorLegend: .85,
            levels: 3,
            maxValue: 0,
            radians: 2 * Math.PI,
            opacityArea: 0.5,
            ToRight: 5,
            TranslateX: 80,
            TranslateY: 30,
            ExtraWidthX: 100,
            ExtraWidthY: 50,
            color: d3.scaleOrdinal().range(['#EDC951','#CC333F','#00A0B0'])
        };

        if('undefined' !== typeof options) {
            for(var i in options) {
                if('undefined' !== typeof options[i]) {
                cfg[i] = options[i];
                }
            }
        }
        cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, i => d3.max(i.map(o => o.value))));
        var allAxis = (d[0].map((i, j) => {return i.axis;}));
        var total = allAxis.length;
        var radius = cfg.factor*Math.min(cfg.w/2, cfg.h/2);
        var Format = d3.format('%');
        d3.select(id).select('svg').remove();

        var g = d3.select(id)
                .append('svg')
                .attr('width', cfg.w+cfg.ExtraWidthX)
                .attr('height', cfg.h+cfg.ExtraWidthY)
                .append('g')
                .attr('transform', 'translate(' + cfg.TranslateX + ',' + cfg.TranslateY + ')');
                ;

        var tooltip;

        // circular segments
        for(var j=0; j<cfg.levels-1; j++) {
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll('.levels')
            .data(allAxis)
            .enter()
            .append('svg:line')
            .attr('x1', (d, i) => {return levelFactor*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr('y1', (d, i) => {return levelFactor*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr('x2', (d, i) => {return levelFactor*(1-cfg.factor*Math.sin((i+1)*cfg.radians/total));})
            .attr('y2', (d, i) => {return levelFactor*(1-cfg.factor*Math.cos((i+1)*cfg.radians/total));})
            .attr('class', 'line')
            .style('stroke', 'grey')
            .style('stroke-opacity', '0.75')
            .style('stroke-width', '0.3px')
            .attr('transform', 'translate(' + (cfg.w/2-levelFactor) + ', ' + (cfg.h/2-levelFactor) + ')');
        }

        // text indicating at what % each level is
        for(var j=0; j<cfg.levels; j++) {
            var levelFactor = cfg.factor*radius*((j+1)/cfg.levels);
            g.selectAll('.levels')
            .data([1]) //dummy data
            .enter()
            .append('svg:text')
            .attr('x', (d) => {return levelFactor*(1-cfg.factor*Math.sin(0));})
            .attr('y', (d) => {return levelFactor*(1-cfg.factor*Math.cos(0));})
            .attr('class', 'legend')
            .style('font-family', 'sans-serif')
            .style('font-size', '10px')
            .attr('transform', 'translate(' + (cfg.w/2-levelFactor + cfg.ToRight) + ', ' + (cfg.h/2-levelFactor) + ')')
            .attr('fill', '#737373')
            .text(Format((j+1)*cfg.maxValue/cfg.levels));
        }


        var axis = g.selectAll('.axis')
                .data(allAxis)
                .enter()
                .append('g')
                .attr('class', 'axis');

        axis.append('line')
            .attr('x1', cfg.w/2)
            .attr('y1', cfg.h/2)
            .attr('x2', (d, i) => {return cfg.w/2*(1-cfg.factor*Math.sin(i*cfg.radians/total));})
            .attr('y2', (d, i) => {return cfg.h/2*(1-cfg.factor*Math.cos(i*cfg.radians/total));})
            .attr('class', 'line')
            .style('stroke', 'grey')
            .style('stroke-width', '1px');

        axis.append('text')
            .attr('class', 'legend')
            .text((d) => {return d})
            .style('font-family', 'sans-serif')
            .style('font-size', '11px')
            .attr('text-anchor', 'middle')
            .attr('dy', '1.5em')
            .attr('transform', (d, i) => {return 'translate(0, -10)'})
            .attr('x', (d, i) => {return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*cfg.radians/total))-60*Math.sin(i*cfg.radians/total);})
            .attr('y', (d, i) => {return cfg.h/2*(1-Math.cos(i*cfg.radians/total))-20*Math.cos(i*cfg.radians/total);});


        d.forEach((y, x) => {
            var dataValues = [];
            g.selectAll('.nodes')
                .data(y, (j, i) => {
                    dataValues.push([
                        cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                });
            dataValues.push(dataValues[0]);
            g.selectAll('.area')
                .data([dataValues])
                .enter()
                .append('polygon')
                .attr('class', 'radar-chart-serie'+series)
                .style('stroke-width', '2px')
                .style('stroke', cfg.color(series))
                .attr('points',(d) => {
                    var str='';
                    for(var pti=0;pti<d.length;pti++) {
                        str=str+d[pti][0]+','+d[pti][1]+' ';
                    }
                    return str;
                })
                .style('fill', (j, i) => {return cfg.color(series);})
                .style('fill-opacity', cfg.opacityArea)
                .on('mouseover', function (d) {
                    var z = 'polygon.' + d3.select(this).attr('class');
                    g.selectAll('polygon')
                    .transition(200)
                    .style('fill-opacity', 0.1);
                    g.selectAll(z)
                    .transition(200)
                    .style('fill-opacity', .7);
                })
                .on('mouseout', function() {
                    g.selectAll('polygon')
                    .transition(200)
                    .style('fill-opacity', cfg.opacityArea);
                });
            series++;
        });
        var series=0;


        d.forEach((y, x) => {
            var dataValues = [];
            g.selectAll('.nodes')
                .data(y).enter()
                .append('svg:circle')
                .attr('class', 'radar-chart-serie'+series)
                .attr('r', cfg.radius)
                .attr('alt', (j) => Math.max(j.value, 0))
                .attr('cx', (j, i) => {
                    dataValues.push([
                        cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total)),
                        cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total))
                    ]);
                    return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.sin(i*cfg.radians/total));
                })
                .attr('cy', (j, i) => {
                    return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*cfg.factor*Math.cos(i*cfg.radians/total));
                })
                .attr('data-id', j => j.axis)
                .style('fill', cfg.color(series)).style('fill-opacity', .9)
                .on('mouseover', function(d) {
                    var newX =  parseFloat(d3.select(this).attr('cx')) - 10;
                    var newY =  parseFloat(d3.select(this).attr('cy')) - 5;

                    tooltip
                        .attr('x', newX)
                        .attr('y', newY)
                        .text(Format(d.value))
                        .transition(200)
                        .style('opacity', 1);

                    var z = 'polygon.'+d3.select(this).attr('class');
                    g.selectAll('polygon')
                        .transition(200)
                        .style('fill-opacity', 0.1);
                    g.selectAll(z)
                        .transition(200)
                        .style('fill-opacity', .7);
                })
                .on('mouseout', function() {
                    tooltip
                        .transition(200)
                        .style('opacity', 0);
                    g.selectAll('polygon')
                        .transition(200)
                        .style('fill-opacity', cfg.opacityArea);
                })
                .append('svg:title')
                .text(j => Math.max(j.value, 0));

            series++;
        });
        // tooltip
        tooltip = g.append('text')
                    .style('opacity', 0)
                    .style('font-family', 'sans-serif')
                    .style('font-size', '13px');
    }
}
