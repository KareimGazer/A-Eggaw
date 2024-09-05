import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { drawMinMaxTemp, drawUVIndex, drawHumidity } from '../utils/draw';

const Graph = ({ data, selectedGraph }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
    }, [selectedGraph, data]);

    useEffect(() => {
        const margin = { top: 10, right: 30, bottom: 20, left: 30 };
        const base_height = 200;
        const height = base_height - margin.top - margin.bottom;
        const width = base_height * 4 - margin.left - margin.right;

        // Set up the responsive SVG element
        const svg = d3.select(svgRef.current)
        .attr('viewBox', `0 0 ${width} ${height + margin.top + margin.bottom}`)
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
        

        if (selectedGraph === 'temp') {
            drawMinMaxTemp(svg, data, margin, base_height);
            console.log("draw new data")
        }
        else if (selectedGraph === 'uvIndex') {
            drawUVIndex(svg, data, margin, base_height);
        }
        else if (selectedGraph === 'humidity') {
            drawHumidity(svg, data, margin, base_height);
        }
    }, [selectedGraph, data]);

    return (
        <div className="w-full h-full p-2">
        <svg ref={svgRef} className="w-full"></svg>
        </div>
    );
};

export default Graph;
