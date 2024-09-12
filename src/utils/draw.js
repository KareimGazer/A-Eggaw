import * as d3 from 'd3';

const drawTemp = (svg, data, width, height) => {

    const x_scale = d3.scalePoint()
        .domain(data.map(d => d.time))
        .range([0, width]);

    // Adjust the Y scale to zoom in on surface temperature values
    const y_scale = d3.scaleLinear()
        .domain([d3.min(data, d => d.temp)-10, d3.max(data, d => d.temp)]) // Adjust the lower bound here to focus on surface values
        .range([height, 0]);

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

    // Define the area generator with initial y position set to the bottom
    const areaGenerator = d3.area()
        .x(d => x_scale(d.time))
        .y0(height) // Extend to the bottom
        .y1(height); // Start from the bottom

    // Append the area path with initial values for the transition
    const areaPath = svg.append('path')
        .datum(data)
        .attr('fill', 'url(#temperature-gradient)')
        .attr('stroke', 'none')
        .attr('d', areaGenerator)
        .attr('fill-opacity', 0.7)

    areaPath.transition()
        .duration(1500)
        .ease(d3.easeCubicInOut)
        .attr('d', d3.area()
        .x(d => x_scale(d.time))
        .y0(height) // Extend to the bottom
        .y1(d => y_scale(d.temp))
        );

    // Add temperature labels
    svg.selectAll(".temp-label")
        .data(data)
        .enter().append("text")
        .attr("x", d => x_scale(d.time))
        .attr("y", height) // Start from the bottom
        .attr("text-anchor", "middle")
        .text((d, i) => i%2 === 0 ? `${d.temp}°C`: "")
        .style("font-size", "14px")
        .style("fill", "black")
        .transition()
        .duration(1500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => y_scale(d.temp) - 10);
    
    // X-axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x_scale))
        .style('color', 'white')
        .style('font-size', '14px');

}

const setupMinMaxTempGraph = (svg, data, width, height) => {

    svg.append('path').datum(data).attr('id', 'area-max-temp').attr('fill', '#c4060f').attr('fill-opacity', 0.6)
    svg.append('path').datum(data).attr('id', 'area-min-temp').attr('fill', '#036ffc').attr('fill-opacity', 0.6)

    svg.append('path').datum(data).attr('id', 'min-temp-line').attr('fill', 'none').attr('stroke', '#00ccf5').attr('stroke-width', 3)
    svg.append('path').datum(data).attr('id', 'max-temp-line').attr('fill', 'none').attr('stroke', '#f73e00').attr('stroke-width', 3)

    svg.append('g').attr('id', 'time-axis').attr('transform', `translate(0,${height})`).style('color', 'white').style('font-size', '10px')
    svg.append('g').attr('id', 'temp-axis').attr("class", "grid").style('color', 'white').style('font-size', '12px')
}

const setupHumidityGraph = (svg, data, width, height) => {
    
    svg.append('path').datum(data).attr('id', 'humidity-line').attr('fill', 'none').attr('stroke', '#00ccf5').attr('stroke-width', 2)
    
    const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'humidity-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%'); // Top-to-bottom gradient
    
    gradient.append('stop')
        .attr('offset', '30%')
        .attr('stop-color', '#03fcc2')
        .attr('stop-opacity', 0.7); 

    gradient.append('stop')
        .attr('offset', '45%')
        .attr('stop-color', '#05e6c8')
        .attr('stop-opacity', 0.7); 

    gradient.append('stop')
        .attr('offset', '80%')
        .attr('stop-color', '#ffffff')
        .attr('stop-opacity', 0.9);
    
        // Append the area under the minTemp (blue)
    svg.append('path').datum(data).attr('id', 'humidity-area').attr('fill', 'url(#humidity-gradient)').attr('fill-opacity', 0.4);
    
    svg.append('g').attr('id', 'time-axis').attr('transform', `translate(0,${height})`).style('color', 'white').style('font-size', '10px')
    svg.append('g').attr('id', 'humidity-axis').attr("class", "grid").style('color', 'white').style('font-size', '12px')
}

const setupUVIndexGraph = (svg, data, width, height) => {
    const [min_uv, max_uv] = [0, 11]

    const x_scale = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([0, width])
        .padding(0.2);
    
    const y_scale = d3.scaleLinear()
        .domain([min_uv, max_uv])
        .nice()
        .range([height, 0]);

    // Bars with dynamic gradient based on UV value
    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x_scale(d.date))
        .attr('y', d => y_scale(d.uvIndex))
        .attr('width', x_scale.bandwidth())
        .attr('height', d => height - y_scale(d.uvIndex))
        

    svg.append('g').attr('id', 'time-axis').attr('transform', `translate(0,${height})`).style('color', 'white').style('font-size', '10px')
    svg.append('g').attr('id', 'uvIndex-axis').attr("class", "grid").style('color', 'white').style('font-size', '12px')
}

export { setupMinMaxTempGraph, setupUVIndexGraph, setupHumidityGraph, drawTemp}