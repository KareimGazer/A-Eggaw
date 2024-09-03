import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const WeatherTemperatureChart = () => {
  const d3Container = useRef(null);

  // Sample data for a 24-hour period, with temperatures every 3 hours
  const data = [
    { time: '00:00', temp: 15 },
    { time: '03:00', temp: 14 },
    { time: '06:00', temp: 13 },
    { time: '09:00', temp: 17 },
    { time: '12:00', temp: 22 },
    { time: '15:00', temp: 24 },
    { time: '18:00', temp: 21 },
    { time: '21:00', temp: 18 }
  ];

  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current);

      // Clear existing content
      svg.selectAll("*").remove();

      // Set up dimensions
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const chart = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Create scales
      const x = d3.scalePoint()
        .domain(data.map(d => d.time))
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([d3.min(data, d => d.temp) - 2, d3.max(data, d => d.temp) + 2])
        .range([height, 0]);

      // Create color scale (white to yellow to red)
      const colorScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.temp), (d3.min(data, d => d.temp) + d3.max(data, d => d.temp)) / 2, d3.max(data, d => d.temp)])
        .range(['#ff0000', '#ffff00', 'white', '#00ff00', '#0000ff']);

      // Create line generator with curve
      const line = d3.line()
        .x(d => x(d.time))
        .y(d => y(d.temp))
        .curve(d3.curveMonotoneX);

      // Create area generator
      const area = d3.area()
        .x(d => x(d.time))
        .y0(height)
        .y1(d => y(d.temp))
        .curve(d3.curveMonotoneX);

      // Create gradient
      const gradient = chart.append('defs')
        .append('linearGradient')
        .attr('id', 'temperature-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('y1', y(d3.max(data, d => d.temp)))
        .attr('x2', 0)
        .attr('y2', y(d3.min(data, d => d.temp)));

      gradient.selectAll('stop')
        .data(colorScale.ticks().map((t, i, n) => ({ offset: `${100*i/n.length}%`, color: colorScale(t) })))
        .enter().append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color);

      // Add the area
      chart.append('path')
        .datum(data)
        .attr('fill', 'url(#temperature-gradient)')
        .attr('d', area);

      // Add the line path
      chart.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('d', line);

      // Add data points
      chart.selectAll('.dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d.time))
        .attr('cy', d => y(d.temp))
        .attr('r', 5)
        .attr('fill', d => colorScale(d.temp))
        .attr('stroke', '#333')
        .attr('stroke-width', 1.5);

      // Add the X Axis
      chart.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      // Add the Y Axis
      chart.append('g')
        .call(d3.axisLeft(y));
    }
  }, []);

  return (
    <svg
      className="d3-component"
      width={600}
      height={400}
      ref={d3Container}
    />
  );
};

export default WeatherTemperatureChart;