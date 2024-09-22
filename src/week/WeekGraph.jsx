import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { drawTemp } from '../utils/draw'

const WeatherTemperatureChart = ({ data }) => {
  const svgRef = useRef()

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()
  }, [data])

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 20, left: 20 }
    const base_height = 280
    const height = base_height - margin.top - margin.bottom
    const width = base_height * 4 - margin.left - margin.right

    // Set up the responsive SVG element
    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    drawTemp(svg, data, width, height)
  }, [data])

  return (
    <div className="w-full h-full p-2 card card-bordered rounded-lg glass">
      <svg ref={svgRef} className="w-full"></svg>
    </div>
  )
}

export default WeatherTemperatureChart
