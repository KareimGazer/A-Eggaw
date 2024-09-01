import { useParams } from 'react-router-dom'

import WeatherCard from "./WeatherCard";
import DaySelector from './DaySelector';

const Dashboard = () => {

    const { country, city } = useParams()
    return (
        <div>
            <DaySelector/>
        </div>
    )
}

export default Dashboard