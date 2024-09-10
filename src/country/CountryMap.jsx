import React from "react";
import { useState, useEffect, useRef } from "react";
import * as d3 from 'd3';
import countriesGeo from "../data/countriesGeo";
import worldCities from "../data/worldCities";

const calculateCentroid = (cities) => {
  const totalCities = cities.length;
  const totalCoords = cities.reduce((acc, city) => [acc[0] + Number(city.longitude), acc[1] + Number(city.latitude)], [0, 0])
  return [totalCoords[0] / totalCities, totalCoords[1] / totalCities];
}

const CountryMap = ({country}) => {
    const svgRef = useRef();
    const parentRef = useRef();
    const cities = worldCities.filter((city) => city.country_name === country)

    const centroid = calculateCentroid(cities)
    console.log(centroid)

    const margin = { top: 5, right: 5, bottom: 5, left: 5 }
    const height = 300;
    const width = 1.5 * height
    const svg = d3.select(svgRef.current).attr("viewBox", [0, 0, width, height]);
    
    // Set up a geographical projection
    const projection = d3.geoEquirectangular()
        .center(centroid) // Center over Egypt
        .scale(1300) // Adjust scale
        .translate([width / 2, height / 2]);
    
    const pathGenerator = d3.geoPath().projection(projection);

    svg.selectAll("path")
        .data(countriesGeo.features)
        .enter().append("path")
        .attr("d", pathGenerator)
        .attr("fill", "#b8b8b8")
        .attr("stroke", "#333");
    
    // Plot the cities on the map
      svg.selectAll("circle")
        .data(cities)
        .enter().append("circle")
        .attr("cx", (city) => projection([Number(city.longitude), Number(city.latitude)])[0])
        .attr("cy", (city) => projection([Number(city.longitude), Number(city.latitude)])[1])
        .attr("r", 2)
        .attr("fill", "red")
        .attr("stroke", "black");

      // Add city labels
      svg.selectAll("text")
        .data(cities)
        .enter().append("text")
        .attr("x", (city) => projection([Number(city.longitude), Number(city.latitude)])[0] + 3)
        .attr("y", (city) => projection([Number(city.longitude), Number(city.latitude)])[1] + 1)
        .text(d => d.name)
        .attr("font-size", "5px")
        .attr("fill", "black");
    
    return (
        <div className="w-full h-full p-2" id='country-map' ref={parentRef}>
            <svg ref={svgRef} className="w-full"></svg>
        </div>
    )
}

export default CountryMap