const GraphSelector = ({ selectedGraph, setSelectedGraph }) => {
  return (
    <div className="p-2 w-full max-w-xs">
      <ul className="grid grid-cols-3 gap-1 ">
        <li
          className={`card card-bordered text-center text-xs  p-1 ${selectedGraph === 'temp' ? 'font-bold bg-accent' : ''} glass`}
          onClick={() => setSelectedGraph('temp')}
        >
          Temp
        </li>
        <li
          className={`card card-bordered text-center text-xs p-1 ${selectedGraph === 'uvIndex' ? 'font-bold bg-accent' : ''} glass`}
          onClick={() => setSelectedGraph('uvIndex')}
        >
          UV
        </li>
        <li
          className={`card card-bordered text-center text-xs  p-1 ${selectedGraph === 'humidity' ? 'font-bold bg-accent' : ''} glass`}
          onClick={() => setSelectedGraph('humidity')}
        >
          Humidity
        </li>
      </ul>
    </div>
  )
}

export default GraphSelector
