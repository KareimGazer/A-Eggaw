import { useEffect, useRef } from 'react';
import * as d3 from 'd3';


const Chart = () => {
    const svgRef = useRef();

    return (
        <div className="w-full h-full p-2">
            <svg ref={svgRef} className="w-full"></svg>
        </div>
    );
}

export default Chart