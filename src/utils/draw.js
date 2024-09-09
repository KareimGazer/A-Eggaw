import * as d3 from 'd3';

const drawTemp = (svg, data, margin, base_height) => {
    const height = base_height - margin.top - margin.bottom;
    const width = base_height * 4 - margin.left - margin.right;

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
        .attr('fill-opacity', 0.7);

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
        .call(d3.axisBottom(x_scale));

}

const drawMinMaxTemp = (svg, data, margin, base_height) => {
    const height = base_height - margin.top - margin.bottom;
    const width = base_height * 4 - margin.left - margin.right;

    const x_scale = d3.scalePoint()
        .domain(data.map(d => d.date))
        .range([0, width]);

    const y_scale = d3.scaleLinear()
        .domain([Math.min(...data.map(d => d.minTemp)) -10, Math.max(...data.map(d => d.maxTemp)) + 10])
        .range([height, 0]);

    // Line generators for minTemp and maxTemp
    const lineMin = d3.line()
        .x(d => x_scale(d.date))
        .y(d => y_scale(d.minTemp));

    const lineMax = d3.line()
        .x(d => x_scale(d.date))
        .y(d => y_scale(d.maxTemp));

    // Area generator for the minTemp (blue) extending to the bottom
    const areaMin = d3.area()
        .x(d => x_scale(d.date))
        .y0(height) // Extend to the bottom
        .y1(d => y_scale(d.minTemp)); // Top is the minTemp line

    // Area generator for the maxTemp (red) extending to the bottom
    const areaMax = d3.area()
        .x(d => x_scale(d.date))
        .y0(height) // Extend to the bottom
        .y1(d => y_scale(d.maxTemp)); // Top is the maxTemp line

    // Append the area under the maxTemp (red)
    svg.append('path')
        .datum(data)
        .attr('fill', '#c4060f') // Redish color with low opacity
        .attr('d', areaMax)
        .attr('fill-opacity', 0.6);
    
    // Append the area under the minTemp (blue)
        svg.append('path')
        .datum(data)
        .attr('fill', '#036ffc') // Blueish color with low opacity
        .attr('d', areaMin)
        .attr('fill-opacity', 0.6);

    // Append the minTemp line (blue)
    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#00ccf5')
        .attr('stroke-width', 3)
        .attr('d', lineMin);

    // Append the maxTemp line (red)
    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#f73e00')
        .attr('stroke-width', 3)
        .attr('d', lineMax);

    // Add the X Axis
    svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x_scale));

    // Add the Y Axis
    svg.append('g')
        .call(d3.axisLeft(y_scale));
}

const drawUVIndex = (svg, data, margin, base_height) => {
    const height = base_height - margin.top - margin.bottom;
    const width = base_height * 4 - margin.left - margin.right;

    const [min_uv, max_uv] = [0, 11]

    const x_scale = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([0, width])
        .padding(0.2);
    
    const y_scale = d3.scaleLinear()
        .domain([min_uv, max_uv])
        .nice()
        .range([height, 0]);

    // Color scale from blue to red based on UV values
    const colorScale = d3.scaleLinear()
        .domain([min_uv, max_uv])
        .range(['#074df0', '#fc030b']); // Blue to red

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
        .attr('fill', d => colorScale(d.uvIndex)) // Dynamic color based on UV value
        .attr('rx', 5) // Rounded corners
        .attr('ry', 5) // Rounded corners
        .attr('opacity', 0.8); // Lower opacity
    
    svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x_scale));

    // Y-axis
    svg.append('g')
        .call(d3.axisLeft(y_scale));
}

const drawHumidity = (svg, data, margin, base_height) => {
    const height = base_height - margin.top - margin.bottom;
    const width = base_height * 4 - margin.left - margin.right;

    const x_scale = d3.scalePoint()
        .domain(data.map(d => d.date))
        .range([0, width]);

    const y_scale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.humidity)])
        .range([height, 0]);

    const lineGenerator = d3.line()
        .x(d => x_scale(d.date))
        .y((d) => y_scale(d.humidity))
    
    // Append the minTemp line (blue)
    svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#05e693')
        .attr('stroke-width', 1)
        .attr('d', lineGenerator);

    // Define the area generator with initial y position set to the bottom
    const areaGenerator = d3.area()
        .x(d => x_scale(d.date))
        .y0(height) // Extend to the bottom
        .y1(d => y_scale(d.humidity)); // Start from the bottom
    
    const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', 'humidity-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%'); // Top-to-bottom gradient
    
    gradient.append('stop')
        .attr('offset', '30%')
        .attr('stop-color', '#05e6c8')
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
    svg.append('path')
        .datum(data)
        .attr('fill', 'url(#humidity-gradient)') // Blueish color with low opacity
        .attr('d', areaGenerator)
        .attr('fill-opacity', 0.4);
    
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x_scale));

    svg.append('g')
        .call(d3.axisLeft(y_scale));
}

export { drawMinMaxTemp, drawUVIndex, drawHumidity, drawTemp}