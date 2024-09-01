
const Stat = ({ title, value, desc }) => {

    return (
        <div className="stat">
            <div className="stat-figure text-primary">
                
            </div>
            <div className="stat-title">
                {title}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">                    
                    </path>
                </svg>
            </div>
            <div className="stat-value text-primary">{value}</div>
        </div>
    )
}

const WeatherCard = ({ city, country, weatherData }) => {

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Current Weather</h2>
                <p className="desc">Expect sunny skies. The high will be 36°.</p>
            </div>
            <div className="stats stats-vertical lg:stats-horizontal shadow">
                <Stat title="Temperature" value={11} desc="Expect sunny skies." />
                <Stat title="Humidity" value={21} desc="Expect sunny skies." />
                <Stat title="Pressure" value={12} desc="Expect sunny skies." />
                <Stat title="Pressure" value={111} desc="Expect sunny skies." />
                <Stat title="Pressure" value={11} desc="Expect sunny skies." />
            </div>
        </div>
    )
}

export default WeatherCard