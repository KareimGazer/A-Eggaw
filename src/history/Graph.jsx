import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { drawMinMaxTemp, drawUVIndex, drawHumidity } from '../utils/draw';

const Graph = ({ data, selectedGraph }) => {
    const svgRef = useRef();
    const margin = { top: 10, right: 20, bottom: 20, left: 20 };
    const base_height = 200;
    const height = base_height - margin.top - margin.bottom;
    const width = base_height * 4 - margin.left - margin.right;

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
    }, [selectedGraph]);

    useEffect(() => {
        // Set up the responsive SVG element
        const svg = d3.select(svgRef.current)
            .attr('viewBox', `0 0 ${width} ${height + margin.top + margin.bottom}`)
            .attr('preserveAspectRatio', 'xMinYMin meet')
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
        
        if (selectedGraph === 'temp') {
            drawMinMaxTemp(svg, data, width, height);
        }
        else if (selectedGraph === 'uvIndex') {
            drawUVIndex(svg, data, width, height);
        }
        else if (selectedGraph === 'humidity') {
            drawHumidity(svg, data, width, height);
        }
    }, [selectedGraph]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        

        if (selectedGraph === 'temp') {

            const x_scale = d3.scalePoint().domain(data.map(d => d.date)).range([0, width]);
            const y_scale = d3.scaleLinear()
                .domain([Math.min(...data.map(d => d.minTemp)) - 10, Math.max(...data.map(d => d.maxTemp)) + 10]).range([height, 0]);
            const lineMin = d3.line().x(d => x_scale(d.date)).y(d => y_scale(d.minTemp)).curve(d3.curveMonotoneX);
            const lineMax = d3.line().x(d => x_scale(d.date)).y(d => y_scale(d.maxTemp)).curve(d3.curveMonotoneX);
            const areaMin = d3.area().x(d => x_scale(d.date)).y0(height).y1(d => y_scale(d.minTemp))
            const areaMax = d3.area().x(d => x_scale(d.date)).y0(height).y1(d => y_scale(d.maxTemp));

            svg.select('#area-max-temp').datum(data).transition().duration(750).attr('d', areaMax)
            svg.select('#area-min-temp').datum(data).transition().duration(750).attr('d', areaMin)
            svg.select('#min-temp-line').datum(data).transition().duration(750).attr('d', lineMin);
            svg.select('#max-temp-line').datum(data).transition().duration(750).attr('d', lineMax);

            svg.selectAll("#time-axis").call(d3.axisBottom(x_scale))
            svg.selectAll("#temp-axis").call(d3.axisLeft(y_scale))
        }
        else if (selectedGraph === 'uvIndex') {
            const [min_uv, max_uv] = [0, 11]
            const x_scale = d3.scaleBand().domain(data.map(d => d.date)).range([0, width]).padding(0.2);
            const y_scale = d3.scaleLinear().domain([min_uv, max_uv]).nice().range([height, 0]);
            const colorScale = d3.scaleLinear().domain([min_uv, max_uv]).range(['#074df0', '#fc030b']); // Blue to red

            svg.selectAll('rect')
                .data(data)
                .transition()
                .duration(1000)
                .attr('x', d => x_scale(d.date))
                .attr('y', d => y_scale(d.uvIndex))
                .attr('width', x_scale.bandwidth())
                .attr('height', d => height - y_scale(d.uvIndex))
                .attr('fill', d => colorScale(d.uvIndex)) // Dynamic color based on UV value
                .attr('rx', 5) // Rounded corners
                .attr('ry', 5) // Rounded corners
                .attr('opacity', 0.8); // Lower opacity
            
            svg.selectAll("#time-axis").call(d3.axisBottom(x_scale))
            svg.selectAll("#uvIndex-axis").call(d3.axisLeft(y_scale))
            
        }
        else if (selectedGraph === 'humidity') {
            const x_scale = d3.scalePoint().domain(data.map(d => d.date)).range([0, width]);
            const y_scale = d3.scaleLinear().domain([0, d3.max(data, d => d.humidity)]).range([height, 0]);
            const lineGenerator = d3.line().x(d => x_scale(d.date)).y((d) => y_scale(d.humidity)).curve(d3.curveMonotoneX);
            const areaGenerator = d3.area().x(d => x_scale(d.date)).y0(height).y1(d => y_scale(d.humidity));

            svg.selectAll("#humidity-line").transition().duration(750).attr("d", lineGenerator(data))
            svg.selectAll("#humidity-area").transition().duration(750).attr("d", areaGenerator(data))
            
            svg.selectAll("#time-axis").call(d3.axisBottom(x_scale))
            svg.selectAll("#humidity-axis").call(d3.axisLeft(y_scale))
        }
        
    }, [selectedGraph, data]);

    return (
        <div className="w-full h-full p-2">
        <svg ref={svgRef} className="w-full"></svg>
        </div>
    );
};

export default Graph;
