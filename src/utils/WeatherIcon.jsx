import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudRain, faCloud, faCloudSun, faSun, faWind, faSnowflake } from '@fortawesome/free-solid-svg-icons'

const WeatherIcon = ({ cond = 'sunny', temp = 0, size }) => {
    
    if (cond.toLowerCase().includes('sun') || temp > 35) {
        return <FontAwesomeIcon icon={faSun} className={`${size}`} />
    }
    else if (cond.toLowerCase().includes('clear') || temp > 30) {
        return <FontAwesomeIcon icon={faCloudSun} className={`${size}`}/>
    }
    else if (cond.toLowerCase().includes('wind') || temp > 25) {
        return <FontAwesomeIcon icon={faWind} className={`${size}`}/>
    }
    else if (cond.toLowerCase().includes('cloud') || temp > 23) {
        return <FontAwesomeIcon icon={faCloud} className={`${size}`}/>
    } else if (cond.toLowerCase().includes('rain') || temp >= 20) {
        return <FontAwesomeIcon icon={faCloudRain} className={`${size}`}/>
    } 
    else {
        return <FontAwesomeIcon icon={faSnowflake} className={`${size}`}/>
    }
}

export default WeatherIcon