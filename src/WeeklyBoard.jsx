import { useState, useEffect } from 'react';
import WeekCards from './WeekCards';
import WeatherTemperatureChart from './WeatherTemperatureChart';
import { getDayWeather } from './weatherService';

const WeeklyBoard = ({ country, city }) => {
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0]
  const [selectedDay, setSelectedDay] = useState(todayDate) // the defualt selection is today
  const [selectedWeather, setSelectedWeather] = useState([])

  useEffect(() => {
    getDayWeather(city, selectedDay, selectedDay).then(weatherData => {
      const data = weatherData.weather?.[0].hourly.map(d => ({ time: d.time, temp: d.tempC }));
      setSelectedWeather(data)
    })
  }, [selectedDay, city])

  return (
      <div className="flex flex-col gap-4 justify-center">
      <WeekCards selectedDay={selectedDay} setSelectedDay={setSelectedDay} city={city} />
      <WeatherTemperatureChart data={selectedWeather} />
      </div>
  )
}

export default WeeklyBoard
