import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// You can load this dynamically with fetch or import directly if local
import bubbleData from './data/collabs_bubble_data.json';

const cityNames = [...new Set(bubbleData.map(d => d.city))];
const color = d3.scaleOrdinal().domain(cityNames).range(d3.schemeCategory10.concat(d3.schemeSet3));

const BubbleMap = () => {
    const ref = useRef(null);

    useEffect(() => {
        const width = 960;
        const height = 600;

        // Clear previous render
        const svg = d3.select(ref.current).attr('width', width).attr('height', height);
        svg.selectAll('*').remove();

        const projection = d3
            .geoMercator()
            .center([0, 20])
            .scale(150)
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        // Create a bubble size scale
        const size = d3.scaleSqrt().domain([1, 10]).range([10, 20]);

        // Color scale (can be enhanced with continent classification)
        const color = d3.scaleOrdinal().domain(['dummy']).range(d3.schemePaired);

        // Load and draw world map
        d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then(
            worldData => {
                svg.append('g')
                    .selectAll('path')
                    .data(worldData.features)
                    .join('path')
                    .attr('fill', '#b8b8b8')
                    .attr('d', path)
                    .style('stroke', 'none')
                    .style('opacity', 0.3);

                // Add bubbles
                svg.selectAll('circle')
                    .data(bubbleData)
                    .join('circle')
                    .attr('cx', d => projection([d.homelon, d.homelat])[0])
                    .attr('cy', d => projection([d.homelon, d.homelat])[1])
                    .attr('r', d => size(d.n))
                    .style('fill', d => color(d.city))
                    .attr('stroke', '#333')
                    .attr('stroke-width', 0.7)
                    .attr('fill-opacity', 0.7)
                    .append('title')
                    .text(d => `${d.city}, ${d.country}: ${d.n} collaboration(s)`);

                // Add legend
                const valuesToShow = [1, 3, 5];
                const xCircle = 100;
                const xLabel = 200;

                svg.selectAll('legend')
                    .data(valuesToShow)
                    .enter()
                    .append('circle')
                    .attr('cx', xCircle)
                    .attr('cy', d => height - size(d))
                    .attr('r', d => size(d))
                    .style('fill', 'none')
                    .attr('stroke', 'black');

                svg.selectAll('legend')
                    .data(valuesToShow)
                    .enter()
                    .append('line')
                    .attr('x1', d => xCircle + size(d))
                    .attr('x2', xLabel)
                    .attr('y1', d => height - size(d))
                    .attr('y2', d => height - size(d))
                    .attr('stroke', 'black')
                    .style('stroke-dasharray', '2,2');

                svg.selectAll('legend')
                    .data(valuesToShow)
                    .enter()
                    .append('text')
                    .attr('x', xLabel)
                    .attr('y', d => height - size(d))
                    .text(d => d)
                    .style('font-size', 10)
                    .attr('alignment-baseline', 'middle');
            }
        );
    }, []);

    return <svg ref={ref}></svg>;
};

export default BubbleMap;
