import { useParams } from 'react-router-dom'

import WeatherCard from "./WeatherCard";

const Dashboard = () => {

    const { country, city } = useParams()
    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <WeatherCard country={country} city={city} weatherData={null} />
        </div>
    )
}

export default Dashboard