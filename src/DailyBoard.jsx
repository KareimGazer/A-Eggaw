import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faCloudRain, faWind, faDroplet, faGlassWaterDroplet, faSun, faEye} from '@fortawesome/free-solid-svg-icons'
import WeatherIcon from './WeatherIcon';
import {getTodayWeather} from './weatherService';
import worldCities from './worldCities';

const Focus = ({currentTemp, desc}) => {

    return (
        <div className='text-center card card-bordered border-2 flex flex-col justify-center p-4 w-full'>
            <h1 className='font-bold text-left card-title'> Today </h1>
            <WeatherIcon cond={desc} size='text-7xl h-full p-16' />
            <div>
                <h1 className='text-4xl'>{currentTemp}°C</h1>
                <p>{desc}</p>
            </div>
        </div>
    )
}

const DayHeader = ({ temp }) => {
    const [counter, setCounter] = useState(0);

    let date = new Date();

    const options = { weekday: 'long' };
    const dayName = date.toLocaleDateString('en-US', options);
    const day = date.getDate();

    const monthOptions = { month: 'short' };
    const monthName = date.toLocaleDateString('en-US', monthOptions);

    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const currentTime = date.toLocaleTimeString('en-US', timeOptions);

    setTimeout(() => {
        setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return (
        <header className='pb-4'>
            <div className='card flex flex-col text-xl'>
                <h1 className='text-left card-title'><span className='font-bold'>{dayName},</span> <span className='font-normal'>{day} {monthName}.</span></h1>
                <h2 className='text-left'>{currentTime}</h2>
                <p className='text-left pt-2'>Feels Like {temp} °C</p>
            </div>
        </header>
    )
}

const Details = ({feelTemp, humidity, wind, precip, pressure, uv, visibility}) => {

    return (
        <div className='p-1 w-full'>
            <DayHeader temp={feelTemp}/>
            <main>
                <div className='grid grid-cols-2 gap-1'>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faDroplet} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>{humidity}%</h1>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faWind} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>{wind} km/h</h1>
                            <p>Wind</p>
                        </div>
                    </div>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faCloudRain} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>{precip}%</h1>
                            <p>precip</p>
                        </div>
                    </div>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faCloud} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>{pressure}</h1>
                            <p>pressure</p>
                        </div>
                    </div>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faSun} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>{uv}</h1>
                            <p>UV</p>
                        </div>
                    </div>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faEye} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>{visibility}</h1>
                            <p>visibility</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

const DailyBoard = ({ country, city}) => {
    const [weatherCond, setWeatherCond] = useState({})
    const city_data = worldCities.filter((c) => c.name === city)[0]
    useEffect(() => {
        getTodayWeather(city_data.latitude, city_data.longitude).then(data => setWeatherCond(data.current_condition[0]))
    }, [city])
    return (
        <div className='flex flex-row gap-2 m-8 justify-center w-full max-w-2xl'>
            <Focus currentTemp={weatherCond.temp_C} desc={weatherCond.weatherDesc?.[0].value}/>
            <Details
                feelTemp={weatherCond.FeelsLikeC}
                humidity={weatherCond.humidity}
                wind={weatherCond.windspeedKmph}
                precip={weatherCond.precipMM}
                pressure={weatherCond.pressure}
                uv={weatherCond.uvIndex}
                visibility={weatherCond.visibility}
            />
        </div>
    )
}

export default DailyBoard