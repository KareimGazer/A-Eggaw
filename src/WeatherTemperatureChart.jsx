import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WeatherTemperatureChart = ({ data }) => {
  // clear the image
  const svgRef = useRef();
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
  }, [data]);
  
  useEffect(() => {

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
      .attr('stop-opacity', 0.7); 
    
    gradient.append('stop')
      .attr('offset', '40%')
      .attr('stop-color', '#f7da57')
      .attr('stop-opacity', 0.7); 

    gradient.append('stop')
      .attr('offset', '75%')
      .attr('stop-color', '#ffffbf')
      .attr('stop-opacity', 0.7); 

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#8dcbeb')
      .attr('stop-opacity', 0.7);

    // X-axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Define the line generator with initial y position set to the bottom
    const lineGenerator = d3.line()
      .x(d => x(d.time))
      .y((d) => y(d.temp))

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
      .attr('fill-opacity', 0.7);

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
      .text((d, i) => i%2 === 0 ? `${d.temp}°C`: "")
      .style("font-size", "14px")
      .style("fill", "black")
      .transition()
      .duration(1500)
      .ease(d3.easeCubicInOut)
      .attr("y", d => y(d.temp) - 10);

  }, [data]);

  return (
    <div className="md:w-auto p-4 card card-bordered rounded-lg pt-4 pb-0 px-0 max-w-4xl">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default WeatherTemperatureChart;
