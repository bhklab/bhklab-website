// components/D3ChordDiagram.tsx
import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

const ChordDiagram = ({ data }) => {
    const ref = useRef();
    const svgWrapperRef = useRef();

    useEffect(() => {
        const orgs = Array.from(new Set(data.map(d => d.organization)));
        const allNodes = ['BHK Lab', ...orgs];
        const indexMap = Object.fromEntries(allNodes.map((n, i) => [n, i]));

        const matrix = Array(allNodes.length)
            .fill(null)
            .map(() => Array(allNodes.length).fill(0));
        data.forEach(d => {
            const i = indexMap['BHK Lab'];
            const j = indexMap[d.organization];
            matrix[i][j] += 1;
            matrix[j][i] += 1;
        });

        const width = 1650;
        const height = 1650;
        const innerRadius = Math.min(width, height) * 0.3;
        const outerRadius = innerRadius + 10;

        d3.select(ref.current).selectAll('*').remove();
        const svg = d3
            .select(ref.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);
        const chords = chord(matrix);

        const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
        const ribbon = d3.ribbon().radius(innerRadius);

        const color = d3
            .scaleOrdinal()
            .domain(allNodes)
            .range(d3.schemeCategory10.concat(d3.schemeSet3).slice(0, allNodes.length));

        svg.append('g')
            .selectAll('path')
            .data(chords.groups)
            .join('path')
            .attr('d', arc)
            .style('fill', d => color(allNodes[d.index]))
            .style('stroke', '#000');

        svg.append('g')
            .selectAll('text')
            .data(chords.groups)
            .join('text')
            .style('font-size', '22px')
            .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
            .attr('dy', '.35em')
            .attr(
                'transform',
                d => `
                    rotate(${(d.angle * 180) / Math.PI - 90})
                    translate(${outerRadius + 3})
                    ${d.angle > Math.PI ? 'rotate(180)' : ''}
                `
            )
            .attr('text-anchor', d => (d.angle > Math.PI ? 'end' : 'start'))
            .text(d => allNodes[d.index]);

        svg.append('g')
            .attr('fill-opacity', 0.67)
            .selectAll('path')
            .data(chords)
            .join('path')
            .attr('d', ribbon)
            .attr('fill', d => {
                const targetIndex = allNodes[d.source.index] === 'BHK Lab' ? d.target.index : d.source.index;
                return color(allNodes[targetIndex]);
            })
            .attr('stroke', '#000');
    }, [data]);

    const handleExport = () => {
        const svgElement = svgWrapperRef.current.querySelector('svg');
        const svgString = new XMLSerializer().serializeToString(svgElement);

        const scaleFactor = 2; // Increase for higher resolution
        const width = svgElement.width.baseVal.value * scaleFactor;
        const height = svgElement.height.baseVal.value * scaleFactor;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        const img = new Image();

        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            // Draw image scaled up, but then shrink the PNG dimensions back to original
            ctx.drawImage(img, 0, 0, width, height);
            URL.revokeObjectURL(url);

            const pngUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = 'chord-diagram-highres.png';
            link.click();
        };

        img.src = url;
    };

    return (
        <div>
            <div ref={svgWrapperRef}>
                <svg ref={ref} style={{ overflow: 'visible' }} />
            </div>
            <button onClick={handleExport} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Export as PNG
            </button>
        </div>
    );
};

export default ChordDiagram;
