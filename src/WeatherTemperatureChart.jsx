import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WeatherTemperatureChart = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = [
      { time: '12 AM', temp: 22 },
      { time: '2 AM', temp: 21 },
      { time: '4 AM', temp: 20 },
      { time: '6 AM', temp: 23 },
      { time: '8 AM', temp: 26 },
      { time: '10 AM', temp: 29 },
      { time: '12 PM', temp: 32 },
      { time: '2 PM', temp: 34 },
      { time: '4 PM', temp: 36 },
      { time: '6 PM', temp: 35 },
      { time: '8 PM', temp: 32 },
      { time: '10 PM', temp: 28 },
    ];

    const margin = { top: 20, right: 30, bottom: 30, left: 10 };
    const base_height = 304
    const height = base_height - margin.top - margin.bottom;
    const width = base_height * 4 - margin.left - margin.right;
    

    // Set up the responsive SVG element
    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scalePoint()
      .domain(data.map(d => d.time))
      .range([0, width]);

    // Adjust the Y scale to zoom in on surface temperature values
    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.temp)-10, d3.max(data, d => d.temp)]) // Adjust the lower bound here to focus on surface values
      .range([height * 0.75, 0]);

    // Create the gradient with less opacity
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'temperature-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%'); // Top-to-bottom gradient

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#d7191c')
      .attr('stop-opacity', 0.4); // Reduced opacity
    
    gradient.append('stop')
      .attr('offset', '40%')
      .attr('stop-color', '#f7da57')
      .attr('stop-opacity', 0.4); // Reduced opacity

    gradient.append('stop')
      .attr('offset', '75%')
      .attr('stop-color', '#ffffbf')
      .attr('stop-opacity', 0.4); // Reduced opacity

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#8dcbeb')
      .attr('stop-opacity', 0.4); // Reduced opacity

    // X-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Define the line generator with initial y position set to the bottom
    const lineGenerator = d3.line()
      .x(d => x(d.time))
      .y((d, i) => {
        // Adding a sine wave effect to the y-coordinate
        const waveAmplitude = 3; // Adjust this value for more or less waviness
        const waveFrequency = 0.5; // Adjust this value for more or less frequency of waves
        const baseY = y(d.temp);
        return baseY + Math.sin(i * waveFrequency) * waveAmplitude;
      }); // Start from the bottom

    // Define the area generator with initial y position set to the bottom
    const areaGenerator = d3.area()
      .x(d => x(d.time))
      .y0(height) // Extend to the bottom
      .y1(height); // Start from the bottom

    // Append the area path with initial values for the transition
    const areaPath = svg.append('path')
      .datum(data)
      .attr('fill', 'url(#temperature-gradient)')
      .attr('stroke', 'none')
      .attr('d', areaGenerator)
      .attr('fill-opacity', 0.6);

    // Append the line path with initial values for the transition
    const linePath = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke-width', 2)
      .attr('d', lineGenerator);

    // Add transition to area and line paths
    linePath.transition()
      .duration(1500)
      .ease(d3.easeCubicInOut)
      .attr('d', d3.line()
        .x(d => x(d.time))
        .y(d => y(d.temp))
      );

    areaPath.transition()
      .duration(1500)
      .ease(d3.easeCubicInOut)
      .attr('d', d3.area()
        .x(d => x(d.time))
        .y0(height) // Extend to the bottom
        .y1(d => y(d.temp))
      );

    // Add temperature labels
    svg.selectAll(".temp-label")
      .data(data)
      .enter().append("text")
      .attr("x", d => x(d.time))
      .attr("y", height) // Start from the bottom
      .attr("text-anchor", "middle")
      .text(d => `${d.temp}°C`)
      .style("font-size", "10px")
      .style("fill", "black")
      .transition()
      .duration(1500)
      .ease(d3.easeCubicInOut)
      .attr("y", d => y(d.temp) - 10);

  }, []);

  return (
    <div className="h-40 md:h-64 p-4 card card-bordered rounded-lg pt-4 pb-0 px-0">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default WeatherTemperatureChart;
